import { BundledLanguage } from "shiki";
import { Badge } from "./ui/badge";

import Link from "next/link";
import { LayoutType } from "./main-nav";

interface SnippetViewProps {
  snippet: {
    slug: string;
    title: string;
    body: string;
    updatedAt: Date;
    tags: string[];
    language: BundledLanguage;
    highlightedBody: string;
  };

  layout: LayoutType;
}

export default function SnippetView({ snippet, layout}: SnippetViewProps) {  
  if(layout === "grid2x2") {
    return (
      <SnippetCard snippet={snippet} />
    );
  }

}

interface SnippetCardProps {
  snippet: {
    slug: string;
    title: string;
    body: string;
    updatedAt: Date;
    tags: string[];
    language: BundledLanguage;
    highlightedBody: string;
  }; 
}

function SnippetCard({snippet}: SnippetCardProps) {
  return (
    <div className="flex flex-col justify-between group rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex flex-col mb-2">
        <h2 className="text-xl font-medium tracking-tight">{snippet.title}</h2>
        {snippet.body && (
          <div
            dangerouslySetInnerHTML={{ __html: snippet.highlightedBody }}
            className="prose dark:prose-invert"
          ></div>
        )}
      </div>
      <div
        className="flex gap-4 items-center overflow-x-scroll"
        style={{ scrollbarWidth: "none" }}
      >
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
              <Badge
                key={i}
                variant="secondary"
                className="border-[rgb(146,_148,_151)]"
              >
                <Link href={""} className="text-center">
                  {tag}
                </Link>
              </Badge>
            ))}
          </div>
        )}
      </div>
      {/* <Link href={snippet.slug} className="absolute inset-0">
        <span className="sr-only">View</span>
      </Link> */}
    </div>
  )
}