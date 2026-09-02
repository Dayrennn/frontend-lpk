import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../lib/baseQuery";

export const asalAPI = createApi({
    reducerPath: "asalAPI",
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ["asalAPI"],
    endpoints: (builder) => ({
        seeAllAsal: builder.query({
            query: () => "/asal",
            providesTags: ["asalAPI"],
        }),
    }),
});

export const { useSeeAllAsalQuery } = asalAPI;
