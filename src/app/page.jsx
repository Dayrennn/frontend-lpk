"use client";

import { GraduationCap, Briefcase, Users, TrendingUp, ArrowRight, BadgeCheck, Building2, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";

export default function LandingPage() {
    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: "#EEF0F4",
                backgroundImage: "radial-gradient(#D7DCE5 1px, transparent 1px)",
                backgroundSize: "22px 22px",
            }}
        >
            <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <Image src="/images/gambar-form.png" width={500} height={500} alt="Picture of the author" className="order-1 lg:order-2 w-full h-full object-cover" />
                    <div className="order-2 lg:order-1 px-6 py-9 sm:px-10 sm:py-12 flex flex-col justify-center">
                        <p className="font-swiss text-[11px] font-semibold tracking-[0.14em] text-[#16223B] uppercase mb-1">FORMULIR PENDAFTARAN</p>
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#16223B] mb-3">Program Pelatihan &amp; Penempatan Kerja Luar Negeri</p>

                        <h1 className="font-swiss font-bold text-3xl sm:text-4xl text-[#16223B] leading-tight mb-4">Yuk Daftar Sekarang</h1>

                        <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed mb-6">
                            Bangun karier yang lebih baik lewat pelatihan kerja bersertifikat dan jalur penempatan langsung ke mitra industri. Tanpa perlu pengalaman — cukup niat
                            dan kemauan belajar, tim kami akan mendampingi sampai kamu diterima kerja.
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <Users className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-[#16223B]">1.200+</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Alumni bekerja</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <Building2 className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-[#16223B]">85+</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Mitra industri</p>
                            </div>
                            <div className="border border-slate-200 rounded-lg px-3 py-3 text-center">
                                <TrendingUp className="w-4 h-4 text-[#16223B] mx-auto mb-1.5" />
                                <p className="text-sm font-semibold text-[#16223B]">92%</p>
                                <p className="text-[10px] text-slate-400 leading-tight">Tingkat penempatan</p>
                            </div>
                        </div>

                        <p className="text-sm sm:text-[15px] text-slate-500 leading-relaxed mb-2">Kontak Kami :</p>
                        <div className="flex flex-col sm:flex-row gap-2 mb-6">
                            <a
                                href="https://wa.me/6285218013518"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-slate-200 text-[#16223B] text-sm font-medium hover:bg-slate-50 transition-colors"
                            >
                                <BsWhatsapp className="w-4 h-4 text-green-600" />
                                +62 852-1801-3518
                            </a>
                            <a
                                href="https://wa.me/6285218012635"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-slate-200 text-[#16223B] text-sm font-medium hover:bg-slate-50 transition-colors"
                            >
                                <BsWhatsapp className="w-4 h-4 text-green-600" />
                                +62 852-1801-2635
                            </a>
                        </div>

                        <Link
                            href={"/pendaftaran"}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                        >
                            Daftar Sekarang
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href={"/verifikasi"}
                            className="mt-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                        >
                            Sudah pernah daftar? Cek status mu disini
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <p className="text-[11px] text-slate-400 mt-3">
                            Kuota tiap gelombang terbatas.{" "}
                            <Link href="/login" className="underline">
                                {" "}
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
