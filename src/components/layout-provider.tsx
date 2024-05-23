"use client"

import { Dispatch, SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import { LayoutType } from "@/components/main-nav"; 

type LayoutContextType = {
    layoutToggleValue: LayoutType
    setLayoutToggleValue: Dispatch<SetStateAction<LayoutType>>
}

export const LayoutContext = createContext<LayoutContextType>({} as LayoutContextType);    

interface LayoutContextProviderProps {
    children: React.ReactNode
    initialLayout?: LayoutType 
}

export function LayoutProvider({children, initialLayout}: LayoutContextProviderProps) {
    const [layoutToggleValue, setLayoutToggleValue] = useState<LayoutType>(initialLayout || "grid2x2");

    useEffect(() => {
        document.cookie = `layout=${layoutToggleValue}`
    }, [layoutToggleValue])

    const value = useMemo(() => ({
        layoutToggleValue,
        setLayoutToggleValue
    }), [layoutToggleValue, setLayoutToggleValue])

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    )
}