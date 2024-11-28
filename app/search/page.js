import SearchPageContent from "./SearchPageContent";

// Dynamic fetching behavior for the app directory
export const dynamic = "force-dynamic";

// Server Component for SearchPage
export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || ""; // Get the query from the URL

  // Fetch data on the server
  const response = await fetch(
    `https://crackswall.zeezsoft.com/api/searchblog?name=${query}`,
    { cache: "no-store" } // Disable caching for dynamic behavior
  );
  const data = await response.json();

  return <SearchPageContent data={data} query={query} />;
}
