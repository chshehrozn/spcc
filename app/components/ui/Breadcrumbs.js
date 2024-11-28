import { ArrowForwardIcon } from "@/app/icons";
import Link from "next/link";

function Breadcrumbs({ pages }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center">
              {index !== 0 && (
                <div className="h-5 w-5 mr-4 flex-shrink-0 text-gray-400">
                  <ArrowForwardIcon />
                </div>
              )}
              <Link
                href={page.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
