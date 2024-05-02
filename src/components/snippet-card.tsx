import { highlight } from "@/lib/shiki";
import { BundledLanguage } from "shiki";
import { Badge } from "./ui/badge";

import Link from "next/link";

interface SnippetCardProps {
  snippet: {
    slug: string;
    title: string;
    body: string;
    updatedAt: Date;
    tags: string[];
    language: BundledLanguage;
  };
}

export default async function SnippetCard({ snippet }: SnippetCardProps) {
  const substring = snippet.body.substring(0, 50);
  const body = substring.length < 50 ? substring : substring.concat("...");
  const highlightedBody = await highlight(body, snippet.language, "github-light");

  return (
    <div className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-medium tracking-tight">{snippet.title}</h2>
          {snippet.body && (
            <div
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
              className="font-mono prose prose-slate dark:prose-invert h-auto overflow-hidden flex"
              style={{ wordBreak: "break-word" }}
            />
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="text-sm text-muted-foreground">
          {snippet.updatedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        {snippet.tags.length !== 0 && (
          <div className="flex gap-2 items-center">
            {snippet.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      {/* <Link href={snippet.slug} className="absolute inset-0">
        <span className="sr-only">View</span>
      </Link> */}
    </div>
  );
}
