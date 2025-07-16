import axios from 'axios';
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from './ChatRoomClient';



async function getChats(id: string) {

    const response = await axios.get(`${BACKEND_URL}/chat/${id}`);
    console.log(response.data.messages);
    return response.data.messages;
    
}


export async function ChatRoom({ id }: { id: string }) {
    
    const messages =  await getChats(id);

    return(
        <div>
            <ChatRoomClient messages={messages} id={id}   />
        </div>

    );
    
}