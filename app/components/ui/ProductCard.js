"use client";
import { StarRating } from "@/app/components/ui";
import { decodeHtmlEntities } from "@/app/utiles/common";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setChooseCategory } from "@/redux/reducers/authReducer";
import { setToJsonStorage } from "@/app/utiles/common";
import {
  CloudDownloadIcon,
  MacIcon,
  MSWindowIcon,
  PcGameIcon,
} from "@/app/icons";

const ProductCard = ({ key, data, slug }) => {
  // console.log("what is product data...", data);

  const router = useRouter();
  const dispatch = useDispatch();
  const subCategoryClick = (data) => {
    router.push(`/${data?.category?.slug}/${data?.subcategory?.slug}`);
    setToJsonStorage("chooseCategory", data?.subcategory);
    dispatch(setChooseCategory(data?.subcategory));
  };

  return (
    <div
      key={key}
      className="flex bg-white sm:flex-row flex-col sm:gap-0 gap-3 p-3 border border-solid border-[#ebebeb]"
    >
      <div className="flex items-center flex-1 gap-3">
        <a href={`/${data?.category.slug}/${data?.slugs}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.soft_image}`}
            alt="logo of software"
            width={65}
            height={65}
          />
        </a>
        <div className="flex flex-col">
          <a
            href={`/${data?.category.slug}/${data?.slugs}`}
            className="text-[#2b373a] cursor-pointer block text-base font-bold 1overflow-hidden 1text-ellipsis 1whitespace-nowrap text-start"
          >
            {data.software_name || "-"} {data.software_version || "-"}
          </a>
          <p className="text-[#666] text-xs font-medium">
            {/* {data.software_description || "-"} */}
            {data.software_description?.slice(0, 45) +
              (data.software_description?.length > 45 ? "..." : "")}
          </p>
          <button
            // href={`/${data?.category.slug}/${data?.subcategory?.slug}`}
            className="text-[#00856f] text-xs font-bold text-start"
            onClick={(e) => {
              subCategoryClick(data);
            }}
          >
            {data?.subcategory
              ? data?.subcategory.title
              : /* ? decodeHtmlEntities(data?.subcategory.title) */
                "-"}
          </button>
        </div>
      </div>
      <div className="flex sm:flex-col flex-row items-center sm:justify-center justify-between sm:px-5 px-0 gap-2 border-l border-solid border-[#ebebeb]">
        <Link
          href={`/${data?.category?.slug}`}
          className="flex items-center justify-start gap-3"
        >
          <div className="flex items-center justify-center h-5 w-5">
            {data?.operating_system === "Windows" ? (
              <Link href={`/${data?.category?.slug}`} className=" h-5 w-5">
                <MSWindowIcon />
              </Link>
            ) : data?.operating_system === "PC Games" ? (
              <PcGameIcon />
            ) : (
              <MacIcon />
            )}
          </div>
          <span className="text-[#2b373a] text-xs font-semibold capitalize">
            {data?.operating_system || "-"}
          </span>
        </Link>
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center justify-center h-3 w-3">
            <CloudDownloadIcon />
          </div>
          <span className="text-[#666] text-[11px] font-semibold capitalize">
            {data?.review_count || "00"}
          </span>
        </div>
      </div>
      <div className="flex items-center sm:pl-5 pl-0 flex-[0.6] gap-2 border-l border-solid border-[#ebebeb]">
        <div className="flex sm:items-center items-start justify-center flex-1 flex-col gap-2">
          <div className="text-[#2b373a] text-center font-bold text-xs">
            Reputation
          </div>
          <StarRating rating={data?.rating_value} />
        </div>
        <div className="flex flex-1 sm:items-center items-end justify-center flex-col gap-2 pl-5 border-l border-solid border-[#ebebeb] h-full">
          <div className="text-[#2b373a] text-center font-bold text-2xl uppercase">
            {data?.file_size}
            {/* 57.9 <span className="text-base">MB</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
