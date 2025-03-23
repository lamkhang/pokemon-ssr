"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BtnFilterType: React.FC<{ name: string }> = ({ name }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = searchParams?.get("types")?.split(",") || [];

  const handleClick = () => {
    if (!searchParams) return;

    const index = types?.findIndex((item) => item === name);
    if (index === -1) {
      types.push(name);
    } else {
      types.splice(index, 1);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (types.length > 0) {
      params.set("types", types.join(","));
    } else {
      params.delete("types");
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };
  return (
    <button
      className={`cursor-pointer rounded-md border  py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg ${
        types?.includes(name)
          ? "bg-blue-600 border-blue-700 text-white"
          : "text-slate-600  border-slate-300 hover:text-white hover:bg-blue-400 hover:border-blue-400"
      }`}
      type="button"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
// focus:text-white focus:bg-blue-600 focus:border-blue-700 active:border-blue-600 active:text-white active:bg-blue-600

export default BtnFilterType;
