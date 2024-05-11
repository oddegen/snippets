"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === "light" ? (
        <Button
          variant="outline"
          size="icon"
          className="border-none"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-6 w-6" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="border-none"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-6 w-6" />
        </Button>
      )}
    </>
  );
}
