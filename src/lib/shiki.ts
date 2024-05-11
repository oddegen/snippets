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
      themes: [...theme, "nord"],
    });
  }

  if (!highlighter.getLoadedLanguages().includes(lang as string)) {
    await highlighter.loadLanguage(lang);
  }

  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "nord",
    },
    transformers: [
      {
        pre(hast) {
          this.addClassToHast(hast, "scroller, sn-code-block");
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
