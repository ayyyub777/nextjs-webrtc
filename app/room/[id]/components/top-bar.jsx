"use client";

import Image from "next/image";

const TopBar = () => {
  return (
    <div className="h-24 p-6 flex justify-start items-center">
      <Image src="/logo.svg" height={32} width={32} alt="logo" />
    </div>
  );
};

export default TopBar;
