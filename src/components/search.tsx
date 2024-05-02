"use client";

import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { Label } from "./ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  searchParam: string
}

export function Search({ className, placeholder, searchParam }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const queryParam = new URLSearchParams(searchParams);

    if (term) {
      queryParam.set(searchParam, term);
    } else {
      queryParam.delete(searchParam);
    }

    replace(`${pathname}?${queryParam.toString()}`);
  }

  return (
    <div className={cn(className, "flex gap-2 items-center")}>
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input
        type="search"
        id="search"
        placeholder={placeholder}
        className={cn(
          className,
          "peer h-8 py-2 px-3 w-64 rounded-xl text-sm outline-2 placeholder:text-gray-500 border-gray-200 focus:border-gray-600"
        )}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("sn")?.toString()}
      />
      <SearchIcon className="text-gray-500 w-[18px] h-[18px] peer-focus:text-gray-900" />
    </div>
  );
}
