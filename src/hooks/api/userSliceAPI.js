import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../lib/baseQuery";

export const userAPI = createApi({
    reducerPath: "userAPI",
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ["userAPI"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({ data }) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["userAPI"],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["userAPI"],
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["userAPI"],
        }),
        logout: builder.mutation({
            query: (credentials) => ({
                url: "/auth/logout",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["userAPI"],
        }),
        getMe: builder.query({
            query: () => "/auth/me",
            providesTags: ["userAPI"],
        }),
        modify: builder.mutation({
            query: ({ id, data }) => ({
                url: `/auth/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["userAPI"],
        }),
        seeAllUser: builder.query({
            query: () => "/auth",
            providesTags: ["userAPI"],
        }),
        seeOneUser: builder.query({
            query: (id) => `/auth/one-user/${id}`,
            providesTags: ["userAPI"],
        }),
    }),
});

export const { useRegisterMutation, useVerifyOtpMutation, useLoginMutation, useLogoutMutation, useGetMeQuery, useModifyMutation, useSeeAllUserQuery, useSeeOneUserQuery } = userAPI;
