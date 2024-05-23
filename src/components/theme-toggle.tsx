"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState<boolean>()
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return;
  }

  return (
    <>
        <Button
          variant="outline"
          size="icon"
          className="border-none"
          onClick={() => {
            if(theme === "light") {
              return setTheme("dark")
            }
            return setTheme("light")
            }}
        >
          {
          theme === "light" 
          ? <Moon className="h-6 w-6" /> :
          <Sun className="h-6 w-6" />
          }
        </Button>
    </>
  );
}
