"use client";

import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import Layout from "@/app/components/layout";
import { Helmet } from "react-helmet-async";
import HelmetWrapper from "@/app/components/HelmetWrapper";
import { ProductCard, CategoryFilter } from "@/app/components/ui";
import { useGetBlogsByCategoryQuery } from "@/redux/services/blogService";
import { useGetCategoriesQuery } from "@/redux/services/categoryService";

export default function CategoryPage() {
  const params = useParams();
  const { categoryName } = params;
  const pathname = usePathname();

  const [currentUrl, setCurrentUrl] = useState("");
  // const [subcategoriesList, setSubCategoriesList] = useState([]);

  const [softwareList, setSoftwareList] = useState([]);
  // const { data: categoriesData } = useGetCategoriesQuery();
  // console.log("categoriesListData....", categoriesData);
  const { isLoading, data } = useGetBlogsByCategoryQuery(categoryName);
  // console.log("category page all blogs list data...", data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Get the full URL
    }
  }, []);

  // function getSubcategoriesBySlug(slug) {
  //   const category = categoriesData?.data.find((cat) => cat.slug === slug);
  //   setSubCategoriesList(category ? category.subcategories : []);

  //   // return category ? category.subcategories : [];
  // }
  // useEffect(() => {
  //   getSubcategoriesBySlug(categoryName);
  // }, [categoryName]);

  useEffect(() => {
    if (!isLoading) {
      setSoftwareList(data?.data?.data || []);
    }
  }, [isLoading, data]);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: `${process.env.NEXT_PUBLIC_WEB_URL}`,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${process.env.NEXT_PUBLIC_WEB_URL}/search?query={search_term_string}`,
        },
        "query-input": {
          "@type": "PropertyValueSpecification",
          valueRequired: "http://schema.org/True",
          valueName: "search_term_string",
        },
      },
    },
    ...softwareList.map((software) => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: software.software_name,
      operatingSystem: software.operating_system,
      applicationCategory: software.application_category,
      offers: {
        "@type": "Offer",
        price: software.price,
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        reviewCount: software.review_count,
        ratingValue: software.rating_value,
      },
    })),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Thing",
            "@id": `${process.env.NEXT_PUBLIC_WEB_URL}${categoryName}`,
            name: `${categoryName}`,
          },
        },
      ],
    },
  ];

  return (
    <HelmetWrapper>
      <Helmet>
        <title>{categoryName}</title>
        <meta
          name="description"
          content={
            "Free download Windows programs, plugins, codecs, drivers, tools, utilities, gaming tools, mobile phone tools, and operating systems."
          }
        />
        <link rel="canonical" href={`${currentUrl}`} />
        <meta
          property="og:image"
          content={data?.data?.software_image || "Default OG Image URL"}
        />
        <meta property="og:url" content={currentUrl || "Default OG URL"} />
        <meta
          property="og:title"
          content={data?.data?.title || "Default OG Title"}
        />
      </Helmet>

      <main className="w-full min-h-[730px]">
        {!isLoading && data?.data?.data?.length > 0 ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
        <Layout loading={isLoading} title={categoryName ? categoryName : "-"}>
          <div className="margins">
            <div className="flex gap-10 py-5 md:flex-row flex-col">
              <div className="flex flex-col md:w-[350px] w-full gap-6 overflow-hidden">
                <CategoryFilter
                  categorySlug={categoryName}
                  subCategorySlug={pathname}
                />
              </div>
              <div className="flex flex-col flex-1 gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center mb-2 bg-white overflow-hidden border border-[#ebebeb] min-h-[66px] w-full relative">
                    <div className="h-full w-[6px] bg-[#00856f] absolute top-0 left-0 bottom-0"></div>
                    <div className="flex items-center justify-between w-full px-7">
                      <h4 className="text-[#2b373a] text-xl font-bold capitalize">
                        {categoryName || "-"}
                      </h4>
                      {/* <Link
                          href={`/${item.slug}`}
                          className="btn-transparent anim"
                        >
                          View All
                        </Link> */}
                    </div>
                  </div>
                  {data?.data?.data?.length ? (
                    <>
                      {data?.data?.data?.map((meta, idx) => (
                        <ProductCard
                          key={idx}
                          data={meta}
                          slug={categoryName}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="">Data No Found!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </HelmetWrapper>
  );
}
