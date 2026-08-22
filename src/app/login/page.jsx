'use client';

import { GraduationCap } from 'lucide-react';
import FormLogin from '../components/form/formLogin';

export default function LoginPage() {

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: '#EEF0F4',
                backgroundImage: 'radial-gradient(#D7DCE5 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-9 sm:px-9 sm:py-10">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-[#D9B25C] flex items-center justify-center mb-4 shadow-sm">
                            <GraduationCap className="w-6 h-6 text-[#16223B]" />
                        </div>
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#B8862E] uppercase mb-2">
                            Portal Peserta
                        </p>
                        <h1 className="font-serif text-2xl font-semibold text-slate-800 leading-tight mb-1.5">
                            Masuk ke Akun
                        </h1>
                        <p className="text-[13px] text-slate-400">Pantau status pendaftaran dan berkas Anda di sini.</p>
                    </div>

                    <FormLogin />
                </div>
            </div>
        </div>
    );
}
