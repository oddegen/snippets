import {
  BundledLanguage,
  BundledTheme,
  Highlighter,
  getHighlighter,
} from "shiki";

let highlighter: Highlighter;

export default async function highlight(
  code: string,
  lang: BundledLanguage,
  theme: BundledTheme[]
) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      themes: [...theme, "nord", "vitesse-black", "vitesse-light"],
    });
  }

  if (!highlighter.getLoadedLanguages().includes(lang as string)) {
    await highlighter.loadLanguage(lang);
  }

  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "vitesse-light",
      dark: "vitesse-black",
    },
    transformers: [
      {
        pre(hast) {
          this.addClassToHast(hast, "scroller, sn-bg-transparent");
        },
        preprocess(code) {
          if (code.endsWith("\n")) {
            return `${code}\n`;
          }
        },
      },
    ],
  });

  return html;
}
