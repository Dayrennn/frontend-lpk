import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../lib/baseQuery';

export const kandidatAPI = createApi({
    reducerPath: 'kandidatAPI',
    refetchOnFocus: true,
    refetchOnReconnect: true,
    baseQuery: baseQueryWithReauth,
    tagTypes: ['kandidatAPI'],
    endpoints: (builder) => ({
        createKandidat: builder.mutation({
            query: ({ data }) => ({
                url: '/kandidat/add-kandidat',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        createKandidatAdmin: builder.mutation({
            query: ({ data }) => ({
                url: "/kandidat/add-kandidat-admin",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['kandidatAPI']
        }),
        modifyKandidat: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kandidat/update-kandidat/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        deleteKandidat: builder.mutation({
            query: (id) => ({
                url: `/kandidat/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        seeAllKandidat: builder.query({
            query: ({ page = 1, limit = 10, search = '' } = {}) =>
                `/kandidat?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        seeAllKandidatAwal: builder.query({
            query: ({ page = 1, limit = 10, search = '' } = {}) =>
                `/kandidat/awal?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        seeOneKandidat: builder.query({
            query: (id) => `/kandidat/${id}`,
            providesTags: ['kandidatAPI'],
        }),
        getDownloadKandidatFile: builder.query({
            query: ({ id, field }) => ({
                url: `/kandidat/${id}/download/${field}`,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        // baca sebagai JSON supaya error message asli kebaca
                        try {
                            return await response.json();
                        } catch {
                            return { message: `Download gagal (status ${response.status})` };
                        }
                    }
                    return response.blob();
                },
                cache: 'no-cache',
            }),
            providesTags: ['kandidatAPI'],
        }),
        simpanPersyaratan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kandidat/simpan-persyaratan/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        getKandidatCalon: builder.query({
            query: () => '/kandidat/calon-peserta',
            providesTags: ['kandidatAPI'],
        }),
        seeKandidatForClass: builder.query({
            query: ({ page = 1, limit = 10, search = '' } = {}) =>
                `/kandidat/kandidat-kelas?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        createKandidatForClass: builder.mutation({
            query: ({ kandidatId, tipeKelas }) => ({
                url: `/kandidat/${kandidatId}/kelas`,
                method: 'POST',
                body: { tipeKelas },
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        seeAllKandidatInggris: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) =>
                `/kandidat/kelas-inggris?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        seeAllKandidatJepang: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) =>
                `/kandidat/kelas-jepang?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        seeAllKandidatMundur: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) =>
                `/kandidat/kandidat-mundur?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        seeCheckKodeKandidat: builder.mutation({
            query: (kodeRegistrasi) => ({
                url: '/kandidat/check',
                method: 'POST',
                body: { kodeRegistrasi },
            }),
            invalidatesTags: ['kandidatAPi'],
        }),
        simpanInterview: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kandidat/input-interview/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        seeKandidatCPMi: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => `/kandidat/data-cpmi?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
            providesTags: ['kandidatAPI'],
        }),
        inputDataCPMI: builder.mutation({
            query: ({ id, data }) => ({
                url: `/kandidat/input-data-cpmi/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['kandidatAPI'],
        }),
        seeOneCPMI: builder.query({
            query: (id) => `/kandidat/data-cpmi/${id}`,
            providesTags: ['kandidatAPI']
        })
    }),
});

export const {
    useCreateKandidatMutation,
    useCreateKandidatAdminMutation,
    useModifyKandidatMutation,
    useDeleteKandidatMutation,
    useSeeAllKandidatQuery,
    useSeeOneKandidatQuery,
    useLazyGetDownloadKandidatFileQuery,
    useSimpanPersyaratanMutation,
    useGetKandidatCalonQuery,
    useSeeKandidatForClassQuery,
    useCreateKandidatForClassMutation,
    useSeeAllKandidatInggrisQuery,
    useSeeAllKandidatJepangQuery,
    useSeeAllKandidatMundurQuery,
    useSeeCheckKodeKandidatMutation,
    useSimpanInterviewMutation,
    useSeeKandidatCPMiQuery,
    useInputDataCPMIMutation,
    useSeeOneCPMIQuery,
    useSeeAllKandidatAwalQuery
} = kandidatAPI;
