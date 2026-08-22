// app/(protected)/layout.jsx  -- bungkus semua halaman yang butuh login
'use client';
import FullPageLoader from '@/app/components/loader/fullPageLoader';
import { useGetMeQuery } from '@/hooks/api/userSliceAPI';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const { data, isLoading, isError } = useGetMeQuery();

    useEffect(() => {
        if (!isLoading && isError) {
            router.replace('/login');
        }
    }, [isLoading, isError, router]);

    if (isLoading) return <FullPageLoader/>
    if (isError) return null; // lagi proses redirect

    return children;
}
