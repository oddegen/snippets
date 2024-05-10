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
  const substring = snippet.body.trim().substring(0, 50);
  const highlightedBody = await highlight(substring, snippet.language, "github-light");

  return (
    <div className="flex flex-col justify-between group rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col mb-2">
          <h2 className="text-xl font-medium tracking-tight">{snippet.title}</h2>
          {snippet.body && (
            <div
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
              className="prose dark:prose-invert"
            ></div>
          )}
      </div>
      <div className="flex gap-4 items-center overflow-hidden hover:overflow-x-scroll" style={{scrollbarWidth: "none"}}>
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {snippet.updatedAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        {snippet.tags.length !== 0 && (
          <div className="flex gap-2 items-center text-sm">
            {snippet.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="border-[rgb(146,_148,_151)]">
                <Link href={""} className="text-center text-[rgb(85,_85,_85)]">{tag}</Link>
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
