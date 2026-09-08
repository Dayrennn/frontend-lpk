"use client";

import { useEffect } from "react";
import { useHeartbeatMutation } from "@/hooks/api/userSliceAPI";

export default function UserHeartbeat() {
    const [heartbeat] = useHeartbeatMutation();

    useEffect(() => {
        const sendHeartbeat = () => {
            heartbeat();
        };

        // langsung saat komponen aktif
        sendHeartbeat();

        // setiap 30 detik
        const interval = setInterval(() => {
            sendHeartbeat();
        }, 30_000);

        return () => {
            clearInterval(interval);
        };
    }, [heartbeat]);

    return null;
}