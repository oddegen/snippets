"use client";

import { useEffect, useRef, useState, useCallback, ChangeEvent } from "react";

import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { snippetSchema } from "@/lib/validations/snippet";
import type { BundledLanguage, BundledLanguageInfo, BundledTheme, BundledThemeInfo, HighlighterGeneric } from "shiki";

interface EditorProps {
  snippet: {
    id: string;
    title?: string;
    content?: string;
  };
}

type FormData = z.infer<typeof snippetSchema>;

export const Editor = ({ snippet }: EditorProps) => {
  const [input, setInput] = useState<string>("");
  // const [isSaving, setIsSaving] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [theme, setTheme] = useState<BundledTheme>("vitesse-dark");
  const [lang, setLang] = useState<BundledLanguage>("typescript");

  const [allThemes, setAllThemes] = useState<BundledThemeInfo[]>([
    {
      id: "vitesse-dark",
      displayName: "Vitesse Dark",
      type: "dark",
      import: undefined!,
    },
  ]);
  const [allLangs, setAllLangs] = useState<BundledLanguageInfo[]>([
    {
      id: "typescript",
      name: "TypeScript",
      import: undefined!,
    },
  ]);

  const highlighterRef = useRef<HighlighterGeneric<BundledLanguage, BundledTheme>>();
  const spanRef = useRef<HTMLSpanElement>(null);

  const init = useCallback(async () => {
    const { getHighlighter } = await import("shiki");
    const { bundledLanguagesInfo } = await import("shiki/bundle/full");
    const { bundledThemesInfo } = await import("shiki/themes");

    setAllLangs(bundledLanguagesInfo);
    setAllThemes(bundledThemesInfo);

    if(highlighterRef.current === undefined) {
      highlighterRef.current = await getHighlighter({
        langs: [lang],
        themes: [theme],
      });
    }

  }, []);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      await Promise.all([highlighterRef.current?.loadTheme(theme), highlighterRef.current?.loadLanguage(lang)]);
      console.log("promise");
    })();

    if (spanRef.current) {
      spanRef.current.innerHTML = highlighterRef.current?.codeToHtml(input, {
        theme,
        lang,
        transformers: [
          {
            preprocess(code) {
              if (code.endsWith("\n")) {
                return `${code}\n`;
              }
            },
          },
        ],
      })!;
    }

    setIsLoading(false);
  }, [lang, theme, input]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      init();
    }
  }, [init]);

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== lang) {
      setInput("");
    }
    setLang(e.target.value as any);
  };

  return (
    <>
    <div className="language-ts vp-adaptive-theme transition-none ">

    </div>
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
        <Textarea
          id="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading ? true : false}
          placeholder="Type your message here..."
          className="flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 resize-none border-0 shadow-none focus-visible:ring-0"
        />
        <span ref={spanRef} className="w-full min-h-[50vh]"></span>
      </form>
    </>
  );
};
