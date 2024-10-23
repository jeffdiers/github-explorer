import { SearchForm } from "@/components/search-form";
import { Suspense } from "react";
import Pagination from "@/components/pagination";
import { DataTable } from "@/components/data-table";
import { fetchRepositories } from "@/lib/data";
import { columns } from "@/components/columns";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || "";
  const order = searchParams?.order || "";

  const { items, total_pages } = await fetchRepositories(
    query,
    currentPage,
    sort,
    order
  );

  return (
    <div className="flex min-h-screen flex-col p-6 container m-auto">
      <main className="flex-grow">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Github Explorer
          </h1>
        </div>
        <div className="mt-4 md:flex items-start justify-between gap-2 md:mt-8">
          <SearchForm />
          {total_pages > 1 && <Pagination totalPages={total_pages} />}
        </div>
        <div className="mt-8">
          <Suspense
            key={query + currentPage + sort + order}
            fallback={<div>Loading...</div>}
          >
            <DataTable columns={columns} data={items} />
          </Suspense>
        </div>
      </main>

      <footer className="py-6 m-auto">
        <div className="container flex flex-col items-center justify-between gap-4">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Thank you for visiting. Created by{" "}
            <a
              href="https://jeffdiers.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Jeff Diers
            </a>
            . You can find the source code for this project on{" "}
            <a
              href="https://github.com/jeffdiers/github-explorer"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
