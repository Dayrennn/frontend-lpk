import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import BACKEND_URL from './backendUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: 'include', // kirim cookie httpOnly otomatis
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401 || result.error?.status === 403) {
        api.dispatch({ type: 'auth/logout' });

        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }

    return result;
};
