import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const blogService = createApi({
  reducerPath: "blog",
  tagType: "blogOperation",
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
      createBlog: builder.mutation({
        query: (data) => {
          return {
            url: "/api/blog",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["blogOperation"],
      }),
      updateBlog: builder.mutation({
        query: ({ _id, values }) => {
          return {
            url: `/api/blog/update/${_id}`,
            method: "POST",
            body: values,
          };
        },
        invalidatesTags: ["blogOperation"],
      }),
      getBlogs: builder.query({
        query: () => {
          return {
            url: "/api/allblogs",
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),
      getAllCategoriesBlogs: builder.query({
        query: () => {
          return {
            url: "/api/allcategoryblogs",
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),
      getSingleBlog: builder.query({
        query: (subCategory) => {
          return {
            url: `/api/blogblogsdetails/${subCategory}`,
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),

      getBlogsByCategory: builder.query({
        query: (categoryName) => {
          return {
            url: `/api/categoryblogs/${categoryName}`,
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),
      getBlogsBySubCategory: builder.query({
        query: (subCategoryName) => {
          return {
            url: `/api/subcategoryblogs/${subCategoryName}`,
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),
      getBlogsBySearch: builder.query({
        query: (query) => {
          return {
            url: `/api/searchblog?name=${query}`,
            method: "GET",
          };
        },
        providesTags: ["blogOperation"],
      }),
      deleteBlogs: builder.mutation({
        query: (id) => {
          return {
            url: `/api/blog/delete/${id}`,
            method: "GET",
          };
        },
        invalidatesTags: ["blogOperation"],
      }),
      createComment: builder.mutation({
        query: ({ formData, id }) => {
          return {
            url: `/api/leavecomment/${id}`,
            method: "POST",
            body: formData,
          };
        },
        invalidatesTags: ["blogOperation"],
      }),
    };
  },
  tagTypes: ["blogOperation"],
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetBlogsQuery,
  useGetAllCategoriesBlogsQuery,
  useGetSingleBlogQuery,
  useGetBlogsByCategoryQuery,
  useGetBlogsBySubCategoryQuery,
  useGetBlogsBySearchQuery,
  useDeleteBlogMutation,
  useCreateCommentMutation,
} = blogService;

export default blogService;
