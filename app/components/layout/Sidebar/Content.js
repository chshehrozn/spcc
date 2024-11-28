"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import SubMenus from "./SubMenus";
import { HomeIcon } from "../../../icons";
import { useGetCategoriesQuery } from "../../../../redux/services/categoryService";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon />,
    current: ["/dashboard"],
  },
];

function Content() {
  const pathname = usePathname();
  const { data } = useGetCategoriesQuery();
  const { userInfo } = useSelector((state) => state.authReducer);

  const rolesList = userInfo?.roles
    ? userInfo?.roles
    : {
        customers_access: 1,
      };

  const filterNavigation = (navigation, roles) => {
    return navigation
      ?.map((item) => {
        if (item?.children) {
          const filteredChildren = item?.children?.filter((child) => {
            // Check if child.key exists before accessing roles[child.key]
            if (child?.key !== undefined) {
              return roles[child.key] !== undefined
                ? roles[child.key] === 1
                : true;
            }
            // Include the child if there's no key
            return true;
          });
          return { ...item, children: filteredChildren };
        } else {
          return item;
        }
      })
      .filter((item) => {
        return !item?.children || item?.children?.length > 0;
      });
  };

  const filteredNavigation = filterNavigation(navigation, rolesList);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto lg:border-r lg:border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-20 shrink-0 items-center">
        <Link href={"/"}>
          <img
            className="h-[40px] w-auto mb-2"
            src="/images/zeezsoft.png"
            alt="logo"
          />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-2">
              {data?.data?.map((item) => {
                let isActive = item.current
                  ? item.current.includes(pathname)
                  : "";
                return (
                  <li key={item.title}>
                    {!item.children ? (
                      <Link
                        href={item.slug}
                        className={`${
                          isActive
                            ? "bg-gray-100 text-gray-900 font-semibold"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        } group flex gap-x-3 rounded-md p-2 text-sm leading-6`}
                      >
                        <div
                          className={`${
                            isActive
                              ? "text-gray-900 h-2 w-2"
                              : "text-gray-700 group-hover:text-gray-900"
                          } h-2 w-2 shrink-0 overflow-hidden`}
                        >
                          <div
                            className="h-2 w-2"
                            dangerouslySetInnerHTML={{ __html: item.icon_code }}
                          />
                          {/* <HomeIcon /> */}
                        </div>
                        {item.title}
                      </Link>
                    ) : (
                      <SubMenus item={item} isActive={isActive} />
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Content;
