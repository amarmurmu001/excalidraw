import axios from 'axios';
import {BACKEND_URL} from '../../config';
import { ChatRoom } from '../../../components/ChatRoom';


async function getRoomId(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    if (response.status === 200) {
        return response.data.room.id;
    }

}

export default async function Room({ params }: {params:{slug: string}}) {
    
    const slug =  (await params).slug;
    const roomId = await getRoomId(slug);

    return (
        <div>
            <h1>Chat Room</h1>
            <p>Room: {slug}</p>
            <p>Room Id: {roomId}</p>

            <ChatRoom id={roomId}/>
        </div>
    );
}
