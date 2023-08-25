"use client";
import Image from "next/image";
import React from "react";

interface AvaterProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvaterProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full "
      height="30"
      width="30"
      alt="Avater"
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
