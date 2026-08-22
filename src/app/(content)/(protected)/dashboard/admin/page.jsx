'use client';

import { Users, Clock, CheckCircle2, Briefcase, ArrowUpRight } from 'lucide-react';

export default function DashboardAdminPage() {
    return (
        <>
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold text-slate-800">Dashboard</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Ringkasan pendaftaran program pelatihan &amp; penempatan kerja.
                </p>
            </div>

            {/* Kartu statistik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#16223B]/5 flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#16223B]" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            12%
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">248</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Total Pendaftar</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">37</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Menunggu Verifikasi</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">164</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Berkas Diverifikasi</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D9B25C]/15 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-[#B8862E]" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">92</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Ditempatkan Kerja</p>
                </div>
            </div>

            {/* Kandidat terbaru */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h2 className="font-serif text-base font-semibold text-slate-800">Kandidat Mendaftar Terbaru</h2>
                    <button className="text-xs font-semibold text-[#16223B] hover:underline underline-offset-4">
                        Lihat semua
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                                <th className="px-5 py-3 font-semibold">Nama</th>
                                <th className="px-5 py-3 font-semibold">Negara Tujuan</th>
                                <th className="px-5 py-3 font-semibold">Tanggal Daftar</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-5 py-3.5 font-medium text-slate-700">Ahmad Fauzi</td>
                                <td className="px-5 py-3.5 text-slate-500">Jepang</td>
                                <td className="px-5 py-3.5 text-slate-500">18 Agu 2026</td>
                                <td className="px-5 py-3.5">
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                                        Menunggu Verifikasi
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-5 py-3.5 font-medium text-slate-700">Siti Rahma</td>
                                <td className="px-5 py-3.5 text-slate-500">Kuwait</td>
                                <td className="px-5 py-3.5 text-slate-500">17 Agu 2026</td>
                                <td className="px-5 py-3.5">
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                                        Terverifikasi
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-5 py-3.5 font-medium text-slate-700">Budi Santoso</td>
                                <td className="px-5 py-3.5 text-slate-500">Turkey</td>
                                <td className="px-5 py-3.5 text-slate-500">17 Agu 2026</td>
                                <td className="px-5 py-3.5">
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D9B25C]/20 text-[#8a6318]">
                                        Ditempatkan
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-5 py-3.5 font-medium text-slate-700">Dewi Lestari</td>
                                <td className="px-5 py-3.5 text-slate-500">Albania</td>
                                <td className="px-5 py-3.5 text-slate-500">16 Agu 2026</td>
                                <td className="px-5 py-3.5">
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600">
                                        Berkas Kurang
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
