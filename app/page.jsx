"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Typography } from "./components/ui/typography";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Video from "./components/ui/video";

export default function Home() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
  const userVideoRef = useRef();

  const handleStream = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          height: { min: 720, ideal: 1080, max: 1080 },
          width: { min: 1280, ideal: 1920, max: 1920 },
        },
      })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userVideoRef.current.onloadedmetadata = () => {
          userVideoRef.current.play();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinRoom = () => {
    router.push(`/room/${roomName || Math.random().toString(36).slice(2)}`);
  };

  useEffect(() => {
    handleStream();
  }, []);

  return (
    <div>
      <main className="max-w-[480px] mx-auto my-16 flex flex-col items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <div className="flex flex-col gap-2 text-center">
          <Typography variant="heading4">Get Started</Typography>
          <Typography variant="body1" className="text-onSurface-mid">
            Setup your audio and video before joining
          </Typography>
        </div>
        <div className="space-y-6">
          <Video className="w-[420px] aspect-[16/11]">
            <video
              autoPlay
              className="absolute inset-0 object-cover w-full h-full rounded-2xl"
              ref={userVideoRef}
            />
          </Video>
          <div className="flex gap-4 w-full">
            <Input
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Room Id"
              value={roomName}
            />
            <Button onClick={joinRoom}>Join Now</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
