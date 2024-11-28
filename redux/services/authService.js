import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
  reducerPath: "auth",
  tagType: "authOperation",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (data) => {
          return {
            url: "api/auth/login",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["authOperation"],
      }),
    };
  },
  tagTypes: ["authOperation"],
});

export const { useLoginMutation } = authService;

export default authService;
