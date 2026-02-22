// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import { v4 as uuidv4 } from "uuid";
// import { apiURL } from "@/services/ClientSide/index";
// import { ChatMessage } from "@/types/mockTests";

// const useChatMessages = (mock_test_id: string, userProfile: any) => {
//   const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);
//   const joinRoom = useRef(false);
//   const socketRef = useRef<any>(null);

//   useEffect(() => {
//     if (!socketRef.current) {
//       socketRef.current = io(apiURL, {
//         withCredentials: true,
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//       });
//     }
//   }, []);

//   const handleReceiveMessage = useCallback((data: ChatMessage) => {
//     setNewMessages((prev) => [...prev, data]);
//   }, []);

//   const handleMessageDelivered = useCallback((messageId: string) => {
//     setNewMessages((prev) => {
//       const index = prev.findIndex((msg) => msg.messageId === messageId);
//       if (index !== -1) {
//         const updated = [...prev];
//         updated[index] = { ...updated[index], status: "delivered" };
//         return updated;
//       }
//       return prev;
//     });
//   }, []);

//   const handleMessageError = useCallback((messageId: string) => {
//     setNewMessages((prev) => {
//       const index = prev.findIndex((msg) => msg.messageId === messageId);
//       if (index !== -1) {
//         const updated = [...prev];
//         updated[index] = { ...updated[index], status: "error" };
//         return updated;
//       }
//       return prev;
//     });
//   }, []);

//   useEffect(() => {
//     if (!joinRoom.current && mock_test_id) {
//       socketRef.current.emit("joinRoom", mock_test_id);
//       joinRoom.current = true;
//     }

//     socketRef.current.on("receiveMessage", handleReceiveMessage);
//     socketRef.current.on("messageError", handleMessageError);
//     socketRef.current.on("messageDelivered", handleMessageDelivered);

//     return () => {
//       socketRef.current.off("receiveMessage", handleReceiveMessage);
//       socketRef.current.off("messageError", handleMessageError);
//       socketRef.current.off("messageDelivered", handleMessageDelivered);
//     };
//   }, [
//     handleMessageDelivered,
//     handleMessageError,
//     handleReceiveMessage,
//     mock_test_id,
//   ]);

//   const sendMessage = (message: JSON) => {
//     const messageId = uuidv4();
//     const messagePayload = {
//       mock_test_id,
//       message,
//       messageId,
//     };
//     socketRef.current.emit("sendMessage", messagePayload);

//     setNewMessages((prev) => [
//       ...prev,
//       {
//         message,
//         messageId,
//         status: "sending",
//         User: { id: userProfile.id },
//         created_at: new Date().toISOString(),
//       },
//     ]);
//   };

//   const messages = useMemo(() => newMessages, [newMessages]);

//   return { messages, sendMessage };
// };

// export default useChatMessages;
