"use client";

import useWebRTC from "@/hooks/useWebRTC";
import TopBar from "./components/top-bar";
import Video from "@/app/components/ui/video";
import BottomBar from "./components/bottom-bar";

const Room = ({ params }) => {
  const { id } = params;
  const [userVideoRef, peerVideoRef] = useWebRTC(id);
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <TopBar />
      <div className="p-6 flex gap-6">
        <Video className="aspect-[16/9]">
          <video
            autoPlay
            className="absolute inset-0 object-cover w-full h-full rounded-2xl"
            ref={userVideoRef}
          />
        </Video>
        <Video className="aspect-[16/9]">
          <video
            autoPlay
            className="absolute inset-0 object-cover w-full h-full rounded-2xl"
            ref={peerVideoRef}
          />
        </Video>
      </div>
      <BottomBar />
    </div>
  );
};

export default Room;
