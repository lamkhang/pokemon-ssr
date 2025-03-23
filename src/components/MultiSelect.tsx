"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useClickOutside } from "src/hooks/use-click-outside";

const MultiSelect: React.FC<{ options: string[] }> = ({ options }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const types = searchParams?.get("types")?.split(",") || [];

  const [expanded, setExpanded] = React.useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => {
    if (expanded) setExpanded(false);
  });

  const handleClick = (name: string) => {
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
    <div className="relative inline-block text-left cursor-pointer" ref={ref}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
          onClick={() => setExpanded(true)}
        >
          {types.length > 0 ? types?.join(", ") : "Chosse type"}
          <svg
            className="-mr-1 size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden">
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className={`block w-full px-4 py-2 text-sm text-gray-700 cursor-pointer  ${
                  types?.includes(option) ? "bg-gray-300" : "hover:bg-gray-100"
                }`}
                onClick={() => handleClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
