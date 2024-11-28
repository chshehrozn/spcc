"use client";
import { Suspense, lazy } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const SubCategoryPage = lazy(() => import("../SubCategoryPage/page"));
const BlogDetailPage = lazy(() => import("../BlogDetailPage/page"));
// import SubCategoryPage from "../SubCategoryPage/page";
// import BlogDetailPage from "../BlogDetailPage/page";

export default function TypePage() {
  const params = useParams();
  const { categoryName, types } = params;
  const { chooseCategory } = useSelector((state) => state.authReducer);

  return (
    <Suspense fallback={<div className=" min-h-screen">Loading...</div>}>
      {chooseCategory?.is_type === "subcategory" &&
      chooseCategory?.slug === types ? (
        <>
          <SubCategoryPage params={params} />
        </>
      ) : (
        <>
          <BlogDetailPage params={params} />
        </>
      )}
    </Suspense>
  );
}
