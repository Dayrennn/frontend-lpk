import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const dashboardAPI = createApi({
    reducerPath: 'dashboardAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['dashboardAPI'],
    endpoints: (builder) => ({
        seeAllKandidatDashboard: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) =>
                `/dashboard/kandidat?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['dashboard'],
        }),
    }),
});

export const { useSeeAllKandidatDashboardQuery } = dashboardAPI;
