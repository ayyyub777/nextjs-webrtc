"use client";

import { Icons } from "@/app/components/icons";
import { Button } from "@/app/components/ui/button";

const BottomBar = () => {
  return (
    <div className="h-24 p-6 flex justify-end items-center">
      <Button
        size="icon"
        className="bg-accent-error text-accent-error-brighter"
      >
        <Icons.exit className="size-8" />
      </Button>
    </div>
  );
};

export default BottomBar;
