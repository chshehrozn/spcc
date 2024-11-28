"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
// import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { ArrowForwardIcon } from "@/app/icons";

function SubMenus({ item, isActive }) {
  const pathname = usePathname();
  const [expend, setExpend] = useState(false);

  useEffect(() => {
    if (item?.current.includes(pathname)) {
      setExpend(true);
    }
  }, [item]);

  return (
    <>
      <button
        className={`${
          isActive
            ? "text-gray-900 font-semibold"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        } flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6`}
        onClick={() => setExpend(!expend)}
      >
        <item.icon className={`h-6 w-6 shrink-0`} aria-hidden="true" />
        {item.name}
        <div
          className={`ml-auto h-5 w-5 shrink-0 ${
            expend ? "rotate-90 text-gray-900" : "text-gray-500"
          }`}
        >
          <ArrowForwardIcon />
        </div>
        {/* <ChevronRightIcon
          className={`ml-auto h-5 w-5 shrink-0 ${
            expend ? "rotate-90 text-gray-900" : "text-gray-500"
          }`}
          aria-hidden="true"
        /> */}
      </button>
      {expend && (
        <ul className="mt-1 px-2">
          {item.children.map((subItem) => {
            let isActive = subItem.href === pathname;
            return (
              <li key={subItem.name}>
                <Link
                  href={subItem.href}
                  className={`block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 ${
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {subItem.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default SubMenus;
