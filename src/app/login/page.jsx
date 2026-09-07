"use client";

import { GraduationCap } from "lucide-react";
import FormLogin from "../components/form/formLogin";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: "#EEF0F4",
                backgroundImage: "radial-gradient(#D7DCE5 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-9 sm:px-9 sm:py-10">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <Image src="/images/Logo.png" width={100} height={100} className="text-[#16223B]" />
                        <h1 className="font-swiss text-2xl font-semibold text-slate-800 leading-tight mb-1.5">Masuk ke Akun</h1>
                        <p className="text-[13px] text-slate-400">Pantau status pendaftaran dan berkas Anda di sini.</p>
                    </div>

                    <FormLogin />
                </div>
            </div>
        </div>
    );
}
