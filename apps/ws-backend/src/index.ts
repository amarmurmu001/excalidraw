import { Room } from './../../../packages/db/generated/prisma/index.d';
import  jwt, { decode, JwtPayload }  from 'jsonwebtoken';
import { WebSocketServer,WebSocket } from 'ws';
import { JWT_SECRET } from '@repo/backend-common/config';

interface User{
  ws: WebSocket;
  userId: string;
  room: string[];
}

const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });


function checkUser(token: string): string | null{
  try{

    const decoded = jwt.verify(token,JWT_SECRET);
    
    if(typeof decoded === 'string'){
      return null;
    }
    
    if(!decoded || !(decoded as JwtPayload).userId){
      return null;
    }
    
    return decoded.userId;
  
  }catch(e){
    console.error('Error verifying token:', e);
    return null;
  }
  return null;
}
  
  wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if(!url){
    return;
  }
  
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') ||"";

  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return null;
  }

  users.push({
    userId: userId,
    room: [],
    ws
  });




  ws.on('message', function message(data){
    const parsedData = JSON.parse(data as unknown as string);
    
    if(parsedData.type === 'join_room'){
      const user = users.find(x => x.ws === ws);
      user?.room.push(parsedData.roomId);
    }

    if(parsedData.type === 'leave_room'){
      const user = users.find(x => x.ws === ws);
      if(!user){
        return;
      }
      user.room = user?.room.filter(x => x !== parsedData.roomId);
    }

    if(parsedData.type === 'chat'){
      const roomId = parsedData.roomId;
      const messsage = parsedData.message;

      users.forEach(user => {
        if(user.room.includes(roomId)){
          user.ws.send(JSON.stringify({
            type: 'chat',
            roomId,
            message: messsage,
          }));
        }
      })

    }
  });

 
});