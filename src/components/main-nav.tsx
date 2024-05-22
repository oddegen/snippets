"use client"

import { Search } from "@/components/search";
import { Icons } from "@/components/icons";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useContext } from "react";
import { LayoutContext } from "@/components/layout-provider";

export type LayoutType = keyof Pick<typeof Icons, "grid2x2" | "grid3x3" | "listFilter">

type LayoutArrayType = Array<LayoutType>

export default function MainNav() {
  const {layoutToggleValue, setLayoutToggleValue} = useContext(LayoutContext);
  const LayoutIcons: LayoutArrayType = ["grid2x2", "grid3x3", "listFilter"]

  return (
    <div className="flex items-center">
      <Search className="mx-auto" placeholder="Search Snippets..." searchParam="snippet" />
      <div className="flex gap-2">
        <ToggleGroup type="single" value={layoutToggleValue} onValueChange={(value) => {
          if(value) {
            setLayoutToggleValue(value as LayoutType)
            }
          }
        }>

      {LayoutIcons.map((layoutIcon, idx) => {
        const Icon = Icons[layoutIcon]

        return (
          <ToggleGroupItem value={layoutIcon} className="rounded-sm h-6 px-1" key={idx}>
          <Icon className="h-4 w-4" />
        </ToggleGroupItem>
        )
      })}
      </ToggleGroup>
      </div>
    </div>
  );
}
