"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Repository = {
  id: number;
  name: string;
  stargazers_count: number;
  forks: number;
  updated_at: Date;
};

const SortHeaderButton = (name: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", name);
        const order = searchParams.get("order") === "asc" ? "desc" : "asc";
        params.set("order", order);
        replace(`${pathname}?${params.toString()}`);
      }}
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: () => SortHeaderButton("name"),
  },
  {
    accessorKey: "stargazers_count",
    header: () => SortHeaderButton("stars"),
  },
  {
    accessorKey: "forks",
    header: () => SortHeaderButton("forks"),
  },
  {
    accessorKey: "updated_at",
    header: () => SortHeaderButton("updated"),
    cell: ({ row }) => new Date(row.original.updated_at).toLocaleDateString(),
  },
];
