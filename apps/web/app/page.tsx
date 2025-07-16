"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";


export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  

  return (
    <div style={{ 
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width:"100vw",
      height:"100vh"
    }}>
      <input style={{
        width: "300px",
        height: "40px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
      }} value={roomId} placeholder="Enter Room ID" type="text" onChange={(e)=>{setRoomId(e.target.value)}} /> 
      
      <button style={{
        marginLeft: "10px",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#0070f3",
        color: "#fff",
        fontSize: "16px",
      }} onClick={()=>{
        router.push("/room/"+roomId);
      }}>Join</button>    
    </div>
  );
}
