"use client";

import LandingPage from "./LandingPage";

export default function LandingPageWrapper({
  blogs,
  categories,
  blogGameCategory,
}) {
  return (
    <LandingPage
      blogs={blogs}
      categories={categories}
      blogGameCategory={blogGameCategory}
    />
  );
}
