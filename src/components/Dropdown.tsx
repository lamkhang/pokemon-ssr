"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { DefaultLimit } from "src/constants";
import { useClickOutside } from "src/hooks/use-click-outside";

const Dropdown: React.FC<{ options: string[] }> = ({ options }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = searchParams?.get("limit") || DefaultLimit;

  const [expanded, setExpanded] = React.useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (expanded) setExpanded(false);
  });

  const handleClick = (option: string) => {
    if (!searchParams) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", option);
    params.delete("page");
    router.push(`?${params.toString()}`);
    setExpanded(false);
  };

  return (
    <div className="relative inline-block text-left cursor-pointer" ref={ref}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
          onClick={() => setExpanded(true)}
        >
          {limit || DefaultLimit}
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
                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer  ${
                  limit === option ? "bg-gray-300" : "hover:bg-gray-100"
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

export default Dropdown;
