import LandingPageWrapper from "./LandingPageWrapper";
export default async function HomePage() {
  const { NEXT_PUBLIC_BASE_URL } = process.env;

  const fetchWithErrorHandling = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `Error fetching ${url}:`,
        response.status,
        response.statusText
      );
      return null; // Or handle the error gracefully
    }
    return response.json();
  };

  const [blogsResponse, categoriesResponse, blogGameCategoryResponse] =
    await Promise.all([
      fetchWithErrorHandling(`${NEXT_PUBLIC_BASE_URL}/api/allblogs`),
      fetchWithErrorHandling(`${NEXT_PUBLIC_BASE_URL}/api/categories`),
      fetchWithErrorHandling(
        `${NEXT_PUBLIC_BASE_URL}/api/categoryblogs/pc-games`
      ),
    ]);

  // Ensure fallback values if the responses are null
  const blogs = blogsResponse?.data || [];
  const categories = categoriesResponse?.data || [];
  const blogGameCategory = blogGameCategoryResponse || {};

  return (
    <LandingPageWrapper
      blogs={blogs}
      categories={categories}
      blogGameCategory={blogGameCategory}
    />
  );
}
