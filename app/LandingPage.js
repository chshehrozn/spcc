"use client";

import HelmetWrapper from "@/app/HelmetWrapper";
import { Helmet } from "react-helmet-async";
import Layout from "@/app/components/layout";
import { ProductCard } from "@/app/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage({ blogs, categories, blogGameCategory }) {
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
    ...categories.map((software) => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: software.software_name,
      operatingSystem: software?.operating_system,
      applicationCategory: software?.application_category,
      offers: {
        "@type": "Offer",
        price: software?.price?.split(" ")[0],
        priceCurrency: software?.price?.split(" ")[1],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        reviewCount: software.review_count,
        ratingValue: software.rating_value,
      },
    })),
  ];

  return (
    <HelmetWrapper>
      <Helmet>
        <title>
          {process.env.NEXT_PUBLIC_PROJECT_NAME} - Full Version Software
        </title>
        <meta
          name="description"
          content="Free Download Windows & MacOS software, Android Apps & Games, E-Learning Videos & E-Books, PC Games, Scripts and much more."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}`} />
      </Helmet>
      {categories.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <main className="w-full">
        <Layout>
          <div className="margins">
            <div className="flex md:flex-row flex-col gap-10 py-5">
              <div className="flex flex-col flex-1 gap-6">
                {blogs.map((item, index) => (
                  <div key={index} className="flex flex-col gap-6">
                    <div className="flex items-center mb-2 bg-white overflow-hidden border border-[#ebebeb] min-h-[66px] w-full relative">
                      <div className="h-full w-[6px] bg-[#00856f] absolute top-0 left-0 bottom-0"></div>
                      <div className="flex items-center justify-between w-full px-7">
                        <h4 className="text-[#2b373a] text-xl font-bold">
                          {item.title || "-"}
                        </h4>
                        <Link
                          href={`/${item.slug}`}
                          className="btn-transparent anim"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                    {item.blogs?.data?.length ? (
                      item.blogs.data.map((meta, idx) => (
                        <ProductCard key={idx} data={meta} slug={""} />
                      ))
                    ) : (
                      <div className="">Data Not Found!</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:w-[350px] w-full overflow-hidden">
                <div className="flex flex-col gap-4 sticky bg-white border border-[#ebebeb] p-6 rounded">
                  <div className="border-b border-solid mb-4 pb-6">
                    <h3 className="text-xl font-bold">
                      {blogGameCategory?.category?.title || ""}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {blogGameCategory?.data?.data?.length ? (
                      blogGameCategory.data.data.map((item, index) => (
                        <div key={index} className="flex w-full gap-3">
                          <Image
                            src={item?.software_image}
                            alt="logo of software"
                            width={65}
                            height={65}
                          />
                          <div className="flex flex-col">
                            <Link
                              href={`${item?.category.slug}/${item?.blogkey}`}
                              className="text-[#2b373a] cursor-pointer block text-sm font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                              {item.software_name || "-"}
                            </Link>
                            <Link
                              href={`/${blogGameCategory?.category?.slug}`}
                              className="text-[#00856f] text-xs font-bold mb-[2px]"
                            >
                              {blogGameCategory?.category?.title || "-"}
                            </Link>
                            <div className="text-[#2b373a] text-start font-bold text-xl capitalize">
                              {item?.file_size}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm">Data not found!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </HelmetWrapper>
  );
}
