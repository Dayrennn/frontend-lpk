'use client';

import { GraduationCap, Briefcase, Users, TrendingUp, ArrowRight, BadgeCheck, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: '#EEF0F4',
                backgroundImage: 'radial-gradient(#D7DCE5 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div
                        className="relative order-1 lg:order-2 min-h-[220px] sm:min-h-[280px] lg:min-h-[520px] overflow-hidden"
                        style={{ background: 'linear-gradient(160deg,#182742,#0F1A2E)' }}
                    >
                        <div
                            className="absolute inset-0 opacity-[0.15]"
                            style={{
                                backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                                backgroundSize: '18px 18px',
                            }}
                        />
                        <div className="relative h-full flex items-center justify-center py-10">
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                                <div className="absolute inset-0 rounded-full border border-white/10" />
                                <div className="absolute inset-6 rounded-full border border-white/10" />

                                <div className="absolute top-4 left-4 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Briefcase className="w-7 h-7 text-white/90" />
                                </div>
                                <div className="absolute bottom-6 right-2 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                    <Users className="w-7 h-7 text-white/90" />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-[#D9B25C] flex items-center justify-center shadow-lg shadow-black/30">
                                    <GraduationCap className="w-11 h-11 text-[#16223B]" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-5 bottom-5 right-5 sm:left-8 sm:bottom-8 sm:right-auto bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-[240px]">
                            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                <BadgeCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 leading-tight">92% peserta</p>
                                <p className="text-[11px] text-slate-400 leading-tight">berhasil ditempatkan kerja</p>
                            </div>
                        </div>
                    </div>
                    <div className="order-2 lg:order-1 px-6 py-9 sm:px-10 sm:py-12 flex flex-col justify-center">
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#B8862E] uppercase mb-3">
                            Program Pelatihan &amp; Penempatan Kerja 2026
                        </p>

                        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-800 leading-tight mb-4">
                            Yuk Daftar Sekarang
                        </h1>

                        <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed mb-6">
                            Bangun karier yang lebih baik lewat pelatihan kerja bersertifikat dan jalur penempatan
                            langsung ke mitra industri. Tanpa perlu pengalaman — cukup niat dan kemauan belajar, tim
                            kami akan mendampingi sampai kamu diterima kerja.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-7">
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <Users className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-slate-800">1.200+</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Alumni bekerja</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <Building2 className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-slate-800">85+</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Mitra industri</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <TrendingUp className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-slate-800">92%</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Tingkat penempatan</p>
                            </div>
                        </div>

                        <Link
                            href={'/pendaftaran'}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                        >
                            Daftar Sekarang
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <p className="text-[11px] text-slate-400 mt-3">
                            Pendaftaran tidak dipungut biaya · Kuota tiap gelombang terbatas
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
