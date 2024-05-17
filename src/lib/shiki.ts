import {
  BuiltinLanguage,
  BuiltinTheme,
  BundledLanguage,
  LanguageRegistration,
  ShikiTransformer,
  SpecialLanguage,
  ThemeRegistration,
  ThemeRegistrationRaw,
  getHighlighter,
  isSpecialLang,
} from "shiki";

//https://github.com/withastro/astro/blob/main/packages/markdown/remark/src/shiki.ts

export interface ShikiConfig {
	langs?: Array<BuiltinLanguage | SpecialLanguage | LanguageRegistration>;
	theme?: BuiltinTheme | ThemeRegistration | ThemeRegistrationRaw;
	themes?: Record<string, BuiltinTheme | ThemeRegistration | ThemeRegistrationRaw>;
	wrap?: boolean | null;
	transformers?: ShikiTransformer[];
}

export interface ShikiHighlighter {
	highlight(
		code: string,
		lang?: string,
		options?: {
			inline?: boolean;
			attributes?: Record<string, string>;
			/**
			 * Raw `meta` information to be used by Shiki transformers
			 */
			meta?: string;
		}
	): Promise<string>;
}

export async function createShikiHighlighter({
	langs = [],
	theme = 'github-dark',
	themes = {},
	wrap = false,
	transformers = [],
}: ShikiConfig): Promise<ShikiHighlighter> {

	const highlighter = await getHighlighter({
		langs: ['plaintext', ...langs],
		themes: Object.values(themes).length ? Object.values(themes) : [theme],
	});

	return {
		async highlight(code, lang = 'plaintext', options) {
			const loadedLanguages = highlighter.getLoadedLanguages();

			if (!isSpecialLang(lang) && !loadedLanguages.includes(lang)) {
				try {
					await highlighter.loadLanguage(lang as BundledLanguage);
				} catch (_err) {
					// eslint-disable-next-line no-console
					console.warn(
						`[Shiki] The language "${lang}" doesn't exist, falling back to "plaintext".`
					);
					lang = 'plaintext';
				}
			}

			const themeOptions = Object.values(themes).length ? { themes } : { theme };
			const inline = options?.inline ?? false;

			return highlighter.codeToHtml(code, {
				...themeOptions,
				lang,
				// NOTE: while we can spread `options.attributes` here so that Shiki can auto-serialize this as rendered
				// attributes on the top-level tag, it's not clear whether it is fine to pass all attributes as meta, as
				// they're technically not meta, nor parsed from Shiki's `parseMetaString` API.
				meta: options?.meta ? { __raw: options?.meta } : undefined,
				transformers: [
					{
						pre(node) {
							// Swap to `code` tag if inline
							if (inline) {
								node.tagName = 'code';
							}

							const {
								class: attributesClass,
								style: attributesStyle,
								...rest
							} = options?.attributes ?? {};
							Object.assign(node.properties, rest);

							const classValue =
								(normalizePropAsString(node.properties.class) ?? '') +
								(attributesClass ? ` ${attributesClass}` : '');
							const styleValue =
								(normalizePropAsString(node.properties.style) ?? '') +
								(attributesStyle ? `; ${attributesStyle}` : '');

              node.properties.class = classValue;
							node.properties.dataLanguage = lang;

							// Handle code wrapping
							// if wrap=null, do nothing.
							if (wrap === false) {
								node.properties.style = styleValue;
								node.properties.class = node.properties.class + ' scoller';
							} else if (wrap === true) {
								node.properties.style =
									styleValue + '; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;';
							}
						},
						code(node) {
							if (inline) {
								return node.children[0] as typeof node;
							}
						},
					...transformers,
          }
				],
			});
		},
	};
}

type Properties = boolean | number | string | null | undefined | Array<string | number>;

function normalizePropAsString(value: Properties): string | null {
	return Array.isArray(value) ? value.join(' ') : (value as string | null);
}

const CachedHighlighters = new Map();

export function CreateCahchedHighlighter(opts : ShikiConfig): Promise<ShikiHighlighter> {
  const key = JSON.stringify(opts, Object.keys(opts).sort())

  if(CachedHighlighters.has(key)) {
    return CachedHighlighters.get(key)
  }

  const highlighter = createShikiHighlighter(opts)
  CachedHighlighters.set(key, highlighter);
  
  return highlighter;
}
