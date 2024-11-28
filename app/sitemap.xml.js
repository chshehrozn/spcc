import { NextResponse } from "next/server";

export async function GET() {
  // Function to fetch blog posts
  async function fetchBlogPosts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/allcategoryblogs`
    );
    const data = await res.json();
    // console.log("all blogs list data....", data?.data?.data);
    return data?.data?.data;
  }

  // Fetch the blog posts
  const blogPosts = await fetchBlogPosts(); // Ensure `blogPosts` is fetched correctly

  // Static pages that don't change
  const staticPages = ["/"];

  // Dynamically generate URLs for blog posts
  const dynamicPages = blogPosts.map((post) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}/${post?.category?.slug}/${post.blogkey}`, // Dynamic blog post URL
      lastmod: post.updated_at, // Last modified date of the post
      image: post?.images[0]?.image_path,
    };
  });

  // Combine static and dynamic pages
  const allPages = [
    ...staticPages.map((page) => ({
      loc: `${process.env.NEXT_PUBLIC_WEB_URL}${page}`,
      lastmod: new Date().toISOString(),
    })),
    ...dynamicPages,
  ];

  // Generate the XML format for the sitemap with image namespace
  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${allPages
        .map((page) => {
          return `
            <url>
              <loc>${page.loc}</loc>
              <lastmod>${page?.lastmod}</lastmod>
              <changefreq>daily</changefreq>
              <priority>0.7</priority>
         ${
           page.image
             ? `<image:image>
                      <image:loc>${process.env.NEXT_PUBLIC_BASE_URL}/${page.image}</image:loc>
                    </image:image>`
             : ""
         }
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  // Return the response as XML
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
