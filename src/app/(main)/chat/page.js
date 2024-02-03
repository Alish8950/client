"use client";
import React, { useEffect } from "react";
import { user } from "../../page";
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  useEffect(() => {
    const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", (socket) => {
      //   alert("connected");
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
        console.log(data.user, data.message)
    });

    socket.on('leave', (data) => {
        console.log(data.user, data.message)
    })
    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  return (
    <>
      <div>
        <div></div>
        <div>
          <input type="text" id="chatInput" />
          <button className="sendBtn">Send</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
