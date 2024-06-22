import { CreateCahchedHighlighter } from "@/lib/shiki";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const snippets = [
    {
      slug: "1",
      title: "Arrays",
      body: `const numbers = [1, 2, 3, 4, 5];`,
      updatedAt: new Date(),
      tags: ["JavaScript", "Coding", "Tech"],
      language: "javascript",
    },
    {
      slug: "2",
      title: "List Comprehension",
      body: `print("Hello World!")`,
      updatedAt: new Date(),
      tags: ["Python", "Coding", "Tech"],
      language: "python",
    },
    {
      slug: "3",
      title: "Java Stream API",
      body: `import java.util.Arrays;
import java.util.stream.Collectors;
`,
      updatedAt: new Date(),
      tags: ["Java", "Coding", "Tech"],
      language: "java",
    },
    {
      slug: "4",
      title: "C++ Vector",
      body: `for(int n : numbers) {
  std::cout << n << " ";
}
  return 0;
}`,
      updatedAt: new Date(),
      tags: ["C++", "Coding", "Tech"],
      language: "cpp",
    },
    {
      slug: "5",
      title: "Array Example",
      body: `doubled = numbers.map { |n| n * 2 }
puts doubled`,
      updatedAt: new Date(),
      tags: ["Ruby", "Coding", "Tech"],
      language: "ruby",
    },
    {
      slug: "6",
      title: "Slice",
      body: `for i, n := range numbers {
  doubled[i] = n * 2
}
fmt.Println(doubled)
}`,
      updatedAt: new Date(),
      tags: ["Go", "Coding", "Tech"],
      language: "go",
    },
    {
      slug: "7",
      title: "PHP Array Example",
      body: `<?php
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(fn($n) => $n * 2, $numbers);
print_r($doubled);
              ?>`,
      updatedAt: new Date(),
      tags: ["PHP", "Coding", "Tech"],
      language: "php",
    },
    {
      slug: "8",
      title: "List",
      body: `fun main() {
  val numbers = listOf(1, 2, 3, 4, 5)
  val doubled = numbers.map { it * 2 }
  println(doubled)
}`,
      updatedAt: new Date(),
      tags: ["Kotlin", "Coding", "Tech"],
      language: "kotlin",
    },
    {
      slug: "9",
      title: "lua",
      body: `function Person:greet()
  print("Hello, my name is " .. self.name .. " and I am " .. self.age .. " years old.")
end`,
      updatedAt: new Date(),
      tags: ["Lua", "Script"],
      language: "lua",
    },
    {
      slug: "10",
      title: "Vectors",
      body: `fn main() {
  let numbers = vec![1, 2, 3, 4, 5];
  let doubled: Vec<i32> = numbers.iter().map(|&n| n * 2).collect();
  println!("{:?}", doubled);
}`,
      updatedAt: new Date(),
      tags: ["Rust", "Coding", "Tech"],
      language: "rust",
    },
    {
      slug: "4",
      title: "C++ Vector",
      body: `for(int n : numbers) {
  std::cout << n << " ";
}
  return 0;
}`,
      updatedAt: new Date(),
      tags: ["C++", "Coding", "Tech"],
      language: "cpp",
    },
    {
      slug: "5",
      title: "Array Example",
      body: `doubled = numbers.map { |n| n * 2 }
puts doubled`,
      updatedAt: new Date(),
      tags: ["Ruby", "Coding", "Tech"],
      language: "ruby",
    },
    {
      slug: "6",
      title: "Slice",
      body: `for i, n := range numbers {
  doubled[i] = n * 2
}
fmt.Println(doubled)
}`,
      updatedAt: new Date(),
      tags: ["Go", "Coding", "Tech"],
      language: "go",
    },
    {
      slug: "7",
      title: "PHP Array Example",
      body: `<?php
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(fn($n) => $n * 2, $numbers);
print_r($doubled);
              ?>`,
      updatedAt: new Date(),
      tags: ["PHP", "Coding", "Tech"],
      language: "php",
    },
    {
      slug: "8",
      title: "List",
      body: `fun main() {
  val numbers = listOf(1, 2, 3, 4, 5)
  val doubled = numbers.map { it * 2 }
  println(doubled)
}`,
      updatedAt: new Date(),
      tags: ["Kotlin", "Coding", "Tech"],
      language: "kotlin",
    }
  ];

  const inputValue = req.nextUrl.searchParams.get("q") || "";

  console.log("q:", inputValue);

  const filteredSnippets = snippets.filter((snippet) => {
    const searchterm = inputValue.toLowerCase();

    if (
      searchterm.trim().length == 0 ||
      snippet.title.trim().toLowerCase().includes(searchterm) ||
      snippet.body.trim().toLowerCase().includes(searchterm)
    ) {
      return snippet;
    }
  });

  const highlighter = await CreateCahchedHighlighter({
    themes: {
      dark: "vitesse-dark",
      light: "vitesse-light",
    },
  });
  const highlightedSnippets = await Promise.all(
    filteredSnippets.map(async (snippet) => {
      const substring = snippet.body.trim().substring(0, 50);
      const highlightedBody = await highlighter.highlight(
        substring,
        snippet.language,
        {
          attributes: {
            class: "scroller sn-bg-transparent",
          },
        }
      );
      return {
        ...snippet,
        highlightedBody,
      };
    })
  );

  return new NextResponse(JSON.stringify(highlightedSnippets));
}
