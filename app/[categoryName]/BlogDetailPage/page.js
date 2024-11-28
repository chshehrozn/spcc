import { BlogDetail } from "./BlogDetail";

export default async function BlogDetailPage({ params }) {
  const { categoryName, types } = params;
  // const types = params.types;

  const blogData = await fetchBlogData(types);
  // const subCategoriesList = await fetchSubCategories(categoryName);

  return (
    <>
      {/* <h1>it working fine</h1> */}
      {/* <BlogDetail data={blogData} types={types} /> */}
      {blogData ? (
        <BlogDetail data={blogData} types={types} />
      ) : (
        <div>Loading...</div> // Can simulate a loading state while waiting for data
      )}
    </>
  );
}

// Function to fetch blog data based on types or slug
async function fetchBlogData(types) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogblogsdetails/${types}`
  );
  const data = await response.json();
  return data;
}

// Function to fetch subcategories based on category name
// async function fetchSubCategories(categoryName) {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategoryblogs/${categoryName}`
//   );
//   const data = await response.json();
//   return data;
// }
