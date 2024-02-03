"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

let user;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("")

  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById('joinInput').value = "";
  };

  const handleClick = () => {
    if(name !== "") {
      sendUser()
      router.push("/chat")
    }
  }
  return (
    <>
      <div>
        <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type="text" id="joinInput" />
        <button
          onClick={() => handleClick()}
          className="joinbtn"
        >Login</button>
      </div>
    </>
  );
}

export { user };
