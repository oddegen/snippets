"use client"

import { useState } from "react"
import MainNav, { type LayoutIconType } from "@/components/main-nav"

export default function Main({children}: {children: React.ReactNode}) {
    const [layoutToggleValue, setLayoutToggleValue] = useState<LayoutIconType>("grid2x2")
    return (
        <>
        <MainNav toggleValue={layoutToggleValue} setToggleValue={setLayoutToggleValue} />
        {children}
        </>
    )
}