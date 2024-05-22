import SnippetsList from "@/components/snippets-list";
import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";

<<<<<<< Updated upstream
export default async function Home() {
  // const user = getCurrentUser()
  const res = await fetch("http://localhost:3000/api")
  const snippets = await res.json();
  
=======
interface HomeProps {
  searchParams: {
    query: string;
  }
}

export default async function Home({searchParams}: HomeProps) {
  // const user = getCurrentUser()
  const res = await fetch("http://localhost:3000/api");
  const initialSnippets = await res.json();

  console.log(searchParams);  
>>>>>>> Stashed changes

  return (
    <>
        {initialSnippets.length !== 0 ? (
          <>
            <MainNav />
            <SnippetsList initialSnippets={initialSnippets} />
          </>
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
