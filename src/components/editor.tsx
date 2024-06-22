"use client";

import { z } from "zod";
import { snippetSchema } from "@/lib/validations/snippet";

interface EditorProps {
  language: string;
  content: string;
  defaultValue: string;
  uri?: any;
}

type FormData = z.infer<typeof snippetSchema>;

export const Editor = ({
  content,
  defaultValue,
  language,
  uri,
}: EditorProps) => {

  return (
    <>
      <div className="language-ts vp-adaptive-theme transition-none "></div>
      <form>
        <select value={lang} onChange={(e) => handleLangChange(e)}>
          {allLangs.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="i-carbon:chevron-down op50" />{" "}
        <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
          {allThemes
            .filter((theme) => theme.type === "light")
            .map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.displayName}
              </option>
            ))}
          <option disabled>──────────</option>
          {allThemes
            .filter((theme) => theme.type === "dark")
            .map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.displayName}
              </option>
            ))}
        </select>
        <div className="i-carbon:chevron-down op50" />
        <div ref={containerElement} className="w-full min-h-[50vh]" />
      </form>
    </>
  );
};
