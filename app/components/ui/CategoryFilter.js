import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/redux/services/categoryService";
import { setChooseCategory } from "@/redux/reducers/authReducer";
import { setToJsonStorage } from "@/app/utiles/common";

const CategoryFilter = ({ categorySlug, subCategorySlug }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: subCategoriesData } = useGetSubCategoriesQuery(categorySlug);
  console.log("subCategoriesData", subCategoriesData?.subcategory);
  const [subcategoriesList, setSubCategoriesList] = useState([]);

  function getSubcategoriesBySlug(slug) {
    const category = categoriesData?.data.find((cat) => cat.slug === slug);
    setSubCategoriesList(category ? category.subcategories : []);

    // return category ? category.subcategories : [];
  }
  useEffect(() => {
    getSubcategoriesBySlug(categorySlug);
  }, [categorySlug]);

  const handleClick = (item) => {
    router.push(`/${categorySlug}/${item?.slug}`);
    setToJsonStorage("chooseCategory", item);
    dispatch(setChooseCategory(item));
  };

  return (
    <>
      <div className="flex flex-col gap-4 sticky bg-white  border border-[#ebebeb] p-6 rounded">
        <h3 className="text-xl font-bold pb-4 mb-3 border-b border-solid border-[#ebebeb]">
          Primary Category
        </h3>
        {categoriesData?.data?.length ? (
          <>
            {categoriesData?.data?.map((item, index) => (
              <Link
                href={`/${item.slug}`}
                key={index}
                className="flex items-center gap-3 w-full cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={`${item.slug}` == categorySlug}
                  className="h-4 w-4 rounded bg-[#ebebeb] cursor-pointer"
                />
                <label className="text-[#666] text-[13px] font-semibold cursor-pointer">
                  {item.title}
                </label>
              </Link>
            ))}
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-4 sticky bg-white  border border-[#ebebeb] p-6 rounded">
        <h3 className="text-xl font-bold pb-4 mb-3 border-b border-solid border-[#ebebeb]">
          Sub Category
        </h3>
        {subCategoriesData?.subcategory?.length ? (
          <>
            {subCategoriesData?.subcategory?.map((item, index) => (
              <>
                {categorySlug ? (
                  <button
                    // href={`/${categorySlug}/${item?.slug}`}
                    key={index}
                    className="flex items-center gap-3 w-full cursor-pointer py-1"
                    onClick={(e) => {
                      handleClick(item);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={`${item.slug}` === subCategorySlug}
                      className="h-4 w-4 rounded bg-[#ebebeb] cursor-pointer"
                    />
                    <label className="text-[#666] text-[13px] font-semibold cursor-pointer">
                      {item.title}
                    </label>
                  </button>
                ) : null}
              </>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};
export default CategoryFilter;
