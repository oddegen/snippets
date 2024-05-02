import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { Grid3X3, LayoutGrid, ListFilter, MoreHorizontal } from "lucide-react";

export default function MainNav() {
  return (
    <div className="flex items-center pt-4">
      <Search className="mx-auto" placeholder="Search Snippets..." searchParam="sn" />
      <div className="rounded-xl flex gap-2 bg-muted px-3 py-1 mr-3">
        <Button className="hover:bg-white rounded-md">
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button className="hover:bg-white rounded-md">
          <ListFilter className="h-4 w-4" />
        </Button>
        <Button className="hover:bg-white rounded-md">
          <Grid3X3 className="h-4 w-4" />
        </Button>
      </div>
      <MoreHorizontal className="h-4 w-4 mr-4" />
    </div>
  );
}
