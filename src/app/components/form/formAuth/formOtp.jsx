"use client";

import { useState } from "react";
import { useVerifyOtpMutation } from "@/hooks/api/userSliceAPI";

export default function FormOtp({ email, onCancel, onSuccess }) {
    const [otp, setOtp] = useState("");
    const [verifyOtp, { isLoading, isError, error }] = useVerifyOtpMutation();

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            await verifyOtp({ email, otp }).unwrap();
            onSuccess?.();
        } catch (err) {
            console.error("Terjadi kesalahan", err);
        }
    };

    return (
        <form onSubmit={handleVerify}>
            <div className="space-y-4 px-6 py-5 text-center">
                <p className="text-sm text-slate-500">
                    Masukkan kode OTP yang dikirim ke <span className="font-medium text-slate-700">{email}</span>
                </p>

                <input
                    type="text"
                    inputMode="numeric"
                    autoFocus
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={isLoading}
                    maxLength={6}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-center text-xl tracking-[0.5em] text-slate-700 placeholder:tracking-normal placeholder:text-slate-300 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

                {isError && <p className="text-sm text-red-500">{error?.data?.message || "Kode OTP salah atau sudah kedaluwarsa."}</p>}
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                    Batal
                </button>

                <button
                    type="submit"
                    disabled={isLoading || otp.length === 0}
                    className="rounded-md bg-[#16223B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2d4d] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                    {isLoading ? "Memverifikasi..." : "Verifikasi"}
                </button>
            </div>
        </form>
    );
}
