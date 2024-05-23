import { CreateCahchedHighlighter } from "@/lib/shiki";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const snippets = [
        {
          slug: "1",
          title: "Hello World",
          body: `const hello = "helloworld"`,
          updatedAt: new Date(),
          tags: ["Javascript", "News", "Coding", "Tech"],
          language: "javascript",
        },
        {
          slug: "2",
          title: "Code...",
          body: `async function getPostForUser(postId: Post["id"], userId: User["id"]) {
          return await db.post.findFirst({
            where: {
              id: postId,
              authorId: userId,
            },
          })
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
        {
          slug: "3",
          title: "interfaces",
          body: `interface EditorPageProps {
          params: { postId: string }
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
        {
          slug: "1",
          title: "Hello World",
          body: `const hello = "helloworld"`,
          updatedAt: new Date(),
          tags: ["Javascript"],
          language: "javascript",
        },
        {
          slug: "2",
          title: "Code...",
          body: `async function getPostForUser(postId: Post["id"], userId: User["id"]) {
          return await db.post.findFirst({
            where: {
              id: postId,
              authorId: userId,
            },
          })
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
        {
          slug: "3",
          title: "interfaces",
          body: `interface EditorPageProps {
          params: { postId: string }
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
        {
          slug: "1",
          title: "Hello World",
          body: `const hello = "helloworld"`,
          updatedAt: new Date(),
          tags: ["Javascript"],
          language: "javascript",
        },
        {
          slug: "2",
          title: "Code...",
          body: `async function getPostForUser(postId: Post["id"], userId: User["id"]) {
          return await db.post.findFirst({
            where: {
              id: postId,
              authorId: userId,
            },
          })
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
        {
          slug: "3",
          title: "interfaces",
          body: `interface EditorPageProps {
          params: { postId: string }
        }`,
          updatedAt: new Date(),
          tags: ["Typescript"],
          language: "typescript",
        },
      ];

      snippets.map((snippet) => (
        snippet.title.toLowerCase().includes(req.
      ))
    
      const highlighter = await CreateCahchedHighlighter({themes: {
        dark: "vitesse-dark",
        light: "vitesse-light"
      }});
      const highlightedSnippets = await Promise.all(snippets.map((async (snippet) => {
          const substring = snippet.body.trim().substring(0, 50);
          const highlightedBody = await highlighter.highlight(substring, snippet.language, {
            attributes: {
              class: "scroller sn-bg-transparent"
            }
          });
          return {
            ...snippet,
            highlightedBody
          };
        })))
    
        return new NextResponse(JSON.stringify(highlightedSnippets))
}