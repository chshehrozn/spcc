"use client";

import React, { useState } from "react";
import Link from "next/link";

function Footer() {
  return (
    <>
      {/* <div className="flex flex-col bottom-0 z-40 min-h-10 shrink-0 items-center gap-4 py-16 mt-10 bg-[#1e2024]">
        <div className="flex flex-col w-full margins">
          <div className="flex md:flex-row sm:flex-col flex-col items-start gap-8 w-full">
            <ul className="flex flex-1 flex-col gap-3">
              <li className="text-[#d9d9d9] text-lg font-bold capitalize mb-4">
                Support Center
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  FAQs
                </Link>
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  Contact Us
                </Link>
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  Software Submission
                </Link>
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  Software Request
                </Link>
              </li>
            </ul>
            <ul className="flex flex-1 flex-col gap-3">
              <li className="text-[#d9d9d9] text-lg font-bold capitalize mb-4">
                Common Issues
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  Common Issues
                </Link>
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  How To Download
                </Link>
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  Zip Password
                </Link>
              </li>
            </ul>
            <ul className="flex flex-1 flex-col gap-3">
              <li className="text-[#d9d9d9] text-lg font-bold capitalize mb-4">
                Company Info
              </li>
              <li className="flex flex-col w-full">
                <Link
                  href="/"
                  className="text-sm font-normal text-[#bbb] hover:text-white anim"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-start md:justify-start justify-center gap-4 w-full mt-20">
            <ul className="flex gap-4">
              <li className="">
                <Link
                  href="/"
                  className="text-sm font-medium text-[#bbb] hover:text-white anim"
                >
                  Terms
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className="text-sm font-medium text-[#bbb] hover:text-white anim"
                >
                  Cookies Policy
                </Link>
              </li>
              <li className="">
                <Link
                  href="/"
                  className="text-sm font-medium text-[#bbb] hover:text-white anim"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="w-full py-5 bg-[#21282a]">
        <div className="flex w-full margins justify-center">
          <p className="text-[#bbb] text-sm font-semibold">
            <span className="text-white font-semibold">
              ©{process.env.NEXT_PUBLIC_PROJECT_NAME}
            </span>{" "}
            - All Rights Reserved 2024
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
