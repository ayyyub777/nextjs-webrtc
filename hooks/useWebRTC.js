import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useWebRTC = ({ roomName }) => {
  const router = useRouter();
  const userVideoRef = useRef();
  const peerVideoRef = useRef();
  const rtcConnectionRef = useRef(null);
  const socketRef = useRef();
  const userStreamRef = useRef();
  const hostRef = useRef(false);

  const handleRoomCreated = () => {
    hostRef.current = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          height: { min: 720, ideal: 1080, max: 1080 },
          width: { min: 1280, ideal: 1920, max: 1920 },
        },
      })
      .then((stream) => {
        /* use the stream */
        userStreamRef.current = stream;
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.onloadedmetadata = () => {
          userVideoRef.current.play();
        };
      })
      .catch((err) => {
        /* handle the error */
        console.log(err);
      });
  };

  const handleRoomJoined = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          height: { min: 720, ideal: 1080, max: 1080 },
          width: { min: 1280, ideal: 1920, max: 1920 },
        },
      })
      .then((stream) => {
        /* use the stream */
        userStreamRef.current = stream;
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.onloadedmetadata = () => {
          userVideoRef.current.play();
        };
        socketRef.current.emit("ready", roomName);
      })
      .catch((err) => {
        /* handle the error */
        console.log("error", err);
      });
  };

  const initiateCall = () => {
    if (hostRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current
      );
      rtcConnectionRef.current
        .createOffer()
        .then((offer) => {
          rtcConnectionRef.current.setLocalDescription(offer);
          socketRef.current.emit("offer", offer, roomName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ICE_SERVERS = {
    iceServers: [
      {
        urls: "stun:openrelay.metered.ca:80",
      },
    ],
  };

  const createPeerConnection = () => {
    // We create a RTC Peer Connection
    const connection = new RTCPeerConnection(ICE_SERVERS);
    // We implement our onicecandidate method for when we received a ICE candidate from the STUN server
    connection.onicecandidate = handleICECandidateEvent;
    // We implement our onTrack method for when we receive tracks
    connection.ontrack = handleTrackEvent;
    return connection;
  };

  const handleReceivedOffer = (offer) => {
    if (!hostRef.current) {
      rtcConnectionRef.current = createPeerConnection();
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[0],
        userStreamRef.current
      );
      rtcConnectionRef.current.addTrack(
        userStreamRef.current.getTracks()[1],
        userStreamRef.current
      );
      rtcConnectionRef.current.setRemoteDescription(offer);

      rtcConnectionRef.current
        .createAnswer()
        .then((answer) => {
          rtcConnectionRef.current.setLocalDescription(answer);
          socketRef.current.emit("answer", answer, roomName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleAnswer = (answer) => {
    rtcConnectionRef.current
      .setRemoteDescription(answer)
      .catch((err) => console.log(err));
  };

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socketRef.current.emit("ice-candidate", event.candidate, roomName);
    }
  };

  const handlerNewIceCandidateMsg = (incoming) => {
    // We cast the incoming candidate to RTCIceCandidate
    const candidate = new RTCIceCandidate(incoming);
    rtcConnectionRef.current
      .addIceCandidate(candidate)
      .catch((e) => console.log(e));
  };

  const handleTrackEvent = (event) => {
    peerVideoRef.current.srcObject = event.streams[0];
  };

  const leaveRoom = () => {
    socketRef.current.emit("leave", roomName); // Let's the server know that user has left the room.
    if (userVideoRef.current.srcObject) {
      userVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving all track of User.
    }
    if (peerVideoRef.current.srcObject) {
      peerVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving audio track of Peer.
    }
    // Checks if there is peer on the other side and safely closes the existing connection established with the peer.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null;
      rtcConnectionRef.current.onicecandidate = null;
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
    router.push("/");
  };

  const onPeerLeave = () => {
    // This person is now the creator because they are the only person in the room.
    hostRef.current = true;
    if (peerVideoRef.current.srcObject) {
      peerVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop()); // Stops receiving all track of Peer.
    }

    // Safely closes the existing connection established with the peer who left.
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.ontrack = null;
      rtcConnectionRef.current.onicecandidate = null;
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
  };

  useEffect(() => {
    socketRef.current = io();

    // First we join a room
    socketRef.current.emit("join", roomName);
    socketRef.current.on("created", handleRoomCreated);
    socketRef.current.on("joined", handleRoomJoined);

    // If the room didn't exist, the server would emit the room was 'created'
    // Whenever the next person joins, the server emits 'ready'
    socketRef.current.on("ready", initiateCall);

    // Emitted when a peer leaves the room
    socketRef.current.on("leave", onPeerLeave);

    // If the room is full, we show an alert
    socketRef.current.on("full", () => {
      window.location.href = "/";
    });

    // Events that are webRTC speccific
    socketRef.current.on("offer", handleReceivedOffer);

    socketRef.current.on("answer", handleAnswer);

    socketRef.current.on("ice-candidate", handlerNewIceCandidateMsg);

    // clear up after
    return () => socketRef.current.disconnect();
  }, [roomName]);

  return [userVideoRef, peerVideoRef];
};

export default useWebRTC;
