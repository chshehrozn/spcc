"use client";

import { useState, useEffect } from "react";
import Layout from "@/app/components/layout";
import { Helmet } from "react-helmet-async";
import HelmetWrapper from "@/app/components/HelmetWrapper";
import { ProductCard, CategoryFilter } from "@/app/components/ui";
import { useGetBlogsBySearchQuery } from "@/redux/services/blogService";

export default function SearchPageContent({ data, query }) {
  //   const query = searchParams.get("q");
  // console.log("searchParams", query, searchParams);
  const [currentUrl, setCurrentUrl] = useState("");
  const { isLoading, data: listData } = useGetBlogsBySearchQuery(query);
  // console.log("what is blogs list by search", data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Get the full URL
    }
  }, []);

  return (
    <HelmetWrapper>
      <Helmet>
        <title>{`You search for ${query} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}</title>
        <meta
          name="description"
          content={
            "Free download Windows programs, plugins, codecs, drivers, tools, utilities, gaming tools, mobile phone tools, and operating systems."
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${currentUrl}`} />
        <meta property="og:url" content={currentUrl || "Default OG URL"} />
        <meta property="og:image" content={"Default OG Image URL"} />
        <meta
          property="og:title"
          content={`You search for ${query} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        />
      </Helmet>

      <main className="w-full min-h-[730px]">
        <Layout
          loading={isLoading}
          title={`You search for ${query} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        >
          <div className="margins">
            <div className="flex gap-10 py-5 md:flex-row flex-col">
              <div className="flex flex-col md:w-[350px] w-full gap-6 overflow-hidden">
                <CategoryFilter categorySlug={""} subCategorySlug={""} />
              </div>
              <div className="flex flex-col flex-1 gap-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center mb-2 bg-white overflow-hidden border border-[#ebebeb] min-h-[66px] w-full relative">
                    <div className="h-full w-[6px] bg-[#00856f] absolute top-0 left-0 bottom-0"></div>
                    <div className="flex items-center justify-between w-full px-7">
                      <h4 className="text-[#2b373a] text-xl font-bold capitalize">
                        {`Products found (${data?.data?.length})` || "-"}
                      </h4>
                    </div>
                  </div>
                  {data?.data?.length ? (
                    <>
                      {data?.data?.map((meta, idx) => (
                        <ProductCard key={idx} data={meta} slug={""} />
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
