"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Button: React.FC<{ name: string; type?: string }> = ({ name, type }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());

    if (type === "prev" && Number(searchParams?.get("page") || 0) > 0) {
      params.set("page", String(Number(searchParams?.get("page") || 0) - 1));
    }
    if (type === "next") {
      params.set("page", String(Number(searchParams?.get("page") || 0) + 1));
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <button
      className="rounded-md cursor-pointer bg-blue-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-600 focus:shadow-none active:bg-blue-600 hover:bg-blue-600 active:shadow-none ml-2"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
