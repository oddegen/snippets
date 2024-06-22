"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
  use,
  useMemo,
} from "react";

import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { snippetSchema } from "@/lib/validations/snippet";
import {
  isSpecialLang,
  isSpecialTheme,
  type BundledLanguage,
  type BundledLanguageInfo,
  type BundledTheme,
  type BundledThemeInfo,
  type HighlighterGeneric,
} from "shiki";

import { useLocalStorage } from "usehooks-ts";

interface EditorProps {
  snippet: {
    slug: string;
    title?: string;
    content?: string;
  };
}

type FormData = z.infer<typeof snippetSchema>;

export const Editor = ({ snippet }: EditorProps) => {
  const [input, setInput] = useState<string>("");
  const [isMounted, setIsMounted] = useState<Boolean>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [theme, setTheme] = useLocalStorage<BundledTheme>(
    "theme",
    "vitesse-black"
  );
  const [lang, setLang] = useLocalStorage<BundledLanguage>(
    "language",
    "typescript"
  );

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

  const highlighterRef =
    useRef<HighlighterGeneric<BundledLanguage, BundledTheme>>();
  const spanRef = useRef<HTMLSpanElement>(null);

  const init = useCallback(async () => {
    const { getHighlighter } = await import("shiki");
    const { bundledLanguagesInfo } = await import("shiki/bundle/full");
    const { bundledThemesInfo } = await import("shiki/themes");

    setAllLangs(bundledLanguagesInfo);
    setAllThemes(bundledThemesInfo);

    if (highlighterRef.current === undefined) {
      highlighterRef.current = await getHighlighter({
        langs: ["plaintext", lang],
        themes: [theme],
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      init();

      return () => {
        highlighterRef.current = undefined;
      };
    }
  }, [init, isMounted]);

  use(
    useMemo(async () => {
      async function loadShiki(lang: string, languageModule: any) {
        setIsLoading(true);

        if (!highlighterRef.current) return;

        if (!highlighterRef.current.getLoadedThemes().includes(lang)) {
          await highlighterRef.current.loadLanguage(await languageModule());
        }
        setIsLoading(false);
      }

      const { bundledLanguages } = await import("shiki/langs");

      if (!lang) return;
      const importFn = (bundledLanguages as any)[lang];
      if (!importFn) return;

      return loadShiki(lang || "", importFn);

    }, [lang])
  );

  const higlightedHtml = useMemo(() => {
    return highlighterRef.current?.codeToHtml(input, {
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
    });
  }, [input, theme, lang])

  useEffect(() => {
    console.log("before", highlighterRef.current?.getLoadedThemes());

    if (spanRef.current && highlighterRef.current) {
        spanRef.current.innerHTML = higlightedHtml ?? "";
    }

    console.log("after", highlighterRef.current?.getLoadedThemes());
  }, [higlightedHtml]);

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== lang) {
      setInput("");
    }
    setLang(e.target.value as BundledLanguage);
  };

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
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as BundledTheme)}
        >
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
