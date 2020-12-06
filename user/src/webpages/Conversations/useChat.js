import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = ":4000";//192.168.43.98:4000 or "http://localhost:4000"

const useChat = (data) => {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);
  const socketRef = useRef();
  const roomId=data.roomId
  const name=data.userinfo.user

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        name: message.name,
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
        count: message.count,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on("usercount", (num) =>{
      setCount(num)
    })
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      name: name,
    });
  };
  const sendCount=()=>{
    socketRef.current.emit("usercount")
  }
  return { messages, sendMessage, count,sendCount};
};

export default useChat;