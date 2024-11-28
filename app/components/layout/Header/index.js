"use client";
import React, { useState, useEffect } from "react";
import { MenuIcon, SearchIcon } from "@/app/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetCategoriesQuery } from "../../../../redux/services/categoryService";

function Header({ setOpenSidebar, title }) {
  const { data } = useGetCategoriesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (searchTerm.trim().length < 3) {
      alert("Please type at least 3 characters.");
      return;
    }
    router.push(`/search/?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex flex-col top-0 z-40 min-h-16 shrink-0 items-center bg-white">
      <div className="flex w-full py-4">
        <div className="margins w-full">
          <div className="flex w-full">
            <div className="flex items-center gap-3">
              <a href="/">
                <Image
                  src="/images/zeezfaveicon.png"
                  alt="Description of image"
                  width={46}
                  height={46}
                />
              </a>
              <div className="search-box relative flex items-center h-9 rounded-lg overflow-hidden bg-[#F5F5F5] border border-[#ebebeb] focus-within:border-[#00856f] anim">
                <div className="search-icon flex items-center justify-center bg-[#00856f] border-2 border-solid border-[#00856f] h-full w-10">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  className="bg-transparent sm:w-96 w-full py-1 px-3 font-semibold"
                  placeholder="search products here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleKeyPress(e);
                    }
                  }}
                />
                {/* {isFocused && (
                  <div className="w-full z-10 flex items-center justify-center absolute bottom-[-10px]">
                    <div className="flex w-full relative group ml-3">
                      <div className="flex w-full transform -translate-x-1/2 bg-black text-white text-sm rounded-lg  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Type at least 3 words and press Enter.
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <div className="hidden md:flex items-center gap-5">
                {data?.data?.map((item, index) => (
                  <Link
                    href={`/${item.slug}`}
                    key={index}
                    className="text-lg font-medium hover:cursor-pointer  hover:text-[#00856f]"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div
                className="flex md:hidden items-center justify-center cursor-pointer"
                onClick={() => setOpenSidebar(true)}
              >
                <MenuIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {title === undefined || title === null || title === "" ? null : (
        <div className="title-header flex items-center">
          <h1 className="margins w-full capitalize text-2xl font-semibold">
            {title}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Header;
