import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from 'react-player'
import { useSocket } from "../providers/socket";
import { usePeer } from "../providers/peer";

const Room = () => {
  const socket = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

const [myStream, setMyStream] = useState(null)

  const handleNewUser = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log(`new user joined : ${emailId}`);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket],
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log(`incoming call from ${from}`, offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
    },
    [createAnswer, socket],
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call accepted", ans);
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer],
  );

  const getUserMediaStream = useCallback(async () => {
 const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true})
  setMyStream(stream)
},[]);

  useEffect(() => {
    socket.on("user-joined", handleNewUser);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUser);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleNewUser, handleIncomingCall, handleCallAccepted, socket]);

  useEffect(() => {
    getUserMediaStream();
  },[getUserMediaStream]);

  return (
    <div>
      <h1>Room page</h1>
      <ReactPlayer url={myStream} playing />
    </div>
  );
};

export default Room;
