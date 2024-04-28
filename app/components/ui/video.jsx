"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { Avatar } from "./avatar";

const Video = ({ className, children }) => {
  return (
    <div
      className={cn(
        "relative bg-surface-dim w-full rounded-2xl flex justify-center items-center",
        className
      )}
    >
      <Avatar>
        <Icons.profile className="size-10" />
      </Avatar>
      {children}
    </div>
  );
};

export default Video;
