"use client"

import {  useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoomClient({messages,id}:{messages:{message:string}[],id:string}) {

   

    const {socket,loading} = useSocket();
    const [chats, setChats] = useState(messages);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(()=>{
        if(socket&& !loading) {

            socket.send(JSON.stringify({type:"join_room",roomId:id}));
            
            socket.onmessage =(event)=>{
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat"){
                    setChats((c)=>[...c,{message:parsedData.message}]);
                }


            }
        }    
    },[socket,loading,id]);

    return(
        <div>
            {chats.map((m, index) => (
                <div key={index}>
                    {m.message}
                </div>
            ))}

            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message here..."
            />

            <button onClick={()=>{
                socket?.send(JSON.stringify({type:"chat",roomId:id,message:currentMessage}));
                setCurrentMessage("");
            }}>Send</button>
        </div>

    );


}