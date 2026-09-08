"use client";

import FullPageLoader from "@/app/components/loader/fullPageLoader";
import UserHeartbeat from "./userHeartbeat";
import { useGetMeQuery } from "@/hooks/api/userSliceAPI";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
    const router = useRouter();

    const { data, isLoading, isError } = useGetMeQuery();

    useEffect(() => {
        if (!isLoading && isError) {
            router.replace("/login");
        }
    }, [isLoading, isError, router]);

    if (isError) return null;

    return (
        <>
            {isLoading && <FullPageLoader />}

            {!isLoading && data && <UserHeartbeat />}

            {children}
        </>
    );
}
