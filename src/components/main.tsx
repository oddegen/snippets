"use client"

import { useEffect, useState } from "react"
import MainNav, { type LayoutType } from "@/components/main-nav"
import { BundledLanguage } from "shiki";
import SnippetView from "./snippet-view";

interface MainProps {
    snippets: {
        slug: string;
        title: string;
        body: string;
        updatedAt: Date;
        tags: string[];
        language: BundledLanguage;
        highlightedBody: string;
      }[];
    initialLayout: LayoutType
}

export default function Main({snippets, initialLayout}: MainProps) {
    const [layoutToggleValue, setLayoutToggleValue] = useState<LayoutType>(initialLayout);

    useEffect(() => {
        document.cookie = `layout=${layoutToggleValue}`
    }, [layoutToggleValue])
    
    return (
        <>
        <MainNav toggleValue={layoutToggleValue} setToggleValue={setLayoutToggleValue} />
            <div className="grid gap-4 md:grid-cols-4 md:gap-6 grid-rows-2">
            {snippets.map((snippet, idx) => {
              return (
              <SnippetView key={idx} snippet={snippet} layout={layoutToggleValue} />
            )})}
            </div>
        </>
    )
}