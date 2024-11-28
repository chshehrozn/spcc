import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagType: "categoryOperation",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const reducers = getState();
      const token = reducers?.authReducer?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getCategories: builder.query({
        query: () => {
          return {
            url: "/api/categories",
            method: "GET",
          };
        },
        providesTags: ["categoryOperation"],
      }),
      getSubCategories: builder.query({
        query: (id) => {
          return {
            url: `/api/subcategory/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categoryOperation"],
      }),
      getSingleCategory: builder.query({
        query: (id) => {
          return {
            url: `/api/category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categoryOperation"],
      }),
    };
  },
  tagTypes: ["categoryOperation"],
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSingleCategoryQuery,
} = categoryService;

export default categoryService;
