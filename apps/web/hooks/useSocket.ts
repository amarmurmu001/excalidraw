import { useEffect, useState } from "react";
import {  WEBSOCKET_URL } from "../app/config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(WEBSOCKET_URL+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZDQzMDRiNy0zN2U5LTQyMjUtYmQ2Yy0wNzYyMGE1MGQ1OWUiLCJpYXQiOjE3NTI2NTA3MDR9.u1a6S8yl69LJoqWT3Tm1Il6yevh6Y6qe9Aru3-juT1s");
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }
    },[])

    return(
        {loading, socket}
    )
}