import { Repository } from "@/components/repositories/columns";

type SearchResponse = {
  incomplete_results: boolean;
  items: Repository[];
  total_count: number;
  total_pages: number;
};

export async function fetchRepositories(
  query: string,
  page: number,
  sort: string,
  order: string
): Promise<SearchResponse> {
  if (!query) {
    return {
      incomplete_results: false,
      items: [],
      total_count: 0,
      total_pages: 0,
    };
  }

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=${sort}&order=${order}&page=${page}`
    );

    // Check if the response is successful.
    if (!response.ok) {
      throw new Error("Failed to fetch repositories.");
    }

    // Extract the total number of pages from the Link header.
    const linkHeader = response.headers.get("Link");
    let totalPages = 1;
    if (linkHeader) {
      const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (lastPageMatch) {
        totalPages = Number(lastPageMatch[1]);
      }
    }

    // Parse the JSON response and return.
    const data = await response.json();
    data.total_pages = totalPages;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch repositories.");
  }
}
