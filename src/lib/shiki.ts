import { BundledLanguage, BundledTheme, Highlighter, getHighlighter } from "shiki";

let highlighter: Highlighter;
export async function highlight(code: string, lang: BundledLanguage, theme: BundledTheme) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      langs: [lang],
      themes: [theme],
    });
  }

  if (!highlighter.getLoadedLanguages().includes(lang as string)) {
    await highlighter.loadLanguage(lang)
  }

  const html = highlighter.codeToHtml(code, {
    lang,
    theme,
  });

  return html;
}
