'use client';

import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FormLogin from '../components/form/formLogin';

const inputClass =
    'w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white transition-colors ' +
    'placeholder:text-slate-400 focus:outline-none focus:border-[#16223B] focus:ring-2 focus:ring-[#16223B]/10';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
