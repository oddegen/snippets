import Main from "@/components/main";
import { LayoutType } from "@/components/main-nav";

import { Button } from "@/components/ui/button";
import {CreateCahchedHighlighter} from "@/lib/shiki";
import { cookies } from "next/headers";

async function getSnippets(userId?: string) {
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

  return snippets;
}

export default async function Home() {
  // const user = getCurrentUser()
  const snippets = await getSnippets();
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
    

  const initialLayout = cookies().get("layout")?.value;

  return (
    <>
        {snippets.length !== 0 ? (
          <Main initialLayout={initialLayout as LayoutType || "grid2x2"} snippets={highlightedSnippets} />
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">You have no snippets</h3>
              <Button className="mt-4">Add Snippets</Button>
            </div>
          </div>
        )}
    </>
  );
}
