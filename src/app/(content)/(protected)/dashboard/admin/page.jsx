'use client';

import { Users, Clock, CheckCircle2, Briefcase, ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useSeeAllKandidatDashboardQuery } from '@/hooks/api/dashboardSliceAPI';
import { useState } from 'react';
import { formatTanggalSimpel } from '@/hooks/helper/formatTanggal';
import Link from 'next/link';

export default function DashboardAdminPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');
    const { data, isLoading, isError } = useSeeAllKandidatDashboardQuery({ page, limit: pageSize, search: keyword });

    const kandidatList = data?.data?.kandidat ?? [];
    const pagination = data?.data?.data ?? {};

    const currentPage = pagination.page ?? 1;
    const totalPages = pagination.totalPages ?? 1;

    const goToPrevPage = () => setPage((p) => Math.max(1, p - 1));
    const goToNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    return (
        <>
            <div className="mb-7">
                <h1 className="font-swiss text-2xl font-semibold text-slate-800">Dashboard</h1>
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
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">{pagination.total}</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Total Pendaftar</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">{pagination.kandidatDraft}</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Menunggu Verifikasi</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">{pagination.kandidatVerifikasi}</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Berkas Diverifikasi</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D9B25C]/15 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-[#B8862E]" />
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-800">{pagination.kandidatPerbaikan}</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Berkas Perbaikan</p>
                </div>
            </div>

            {/* Kandidat terbaru */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h2 className="font-swiss text-base font-semibold text-slate-800">Kandidat Mendaftar Terbaru</h2>
                    <Link
                        href="/data-kandidat"
                        className="text-xs font-semibold text-[#16223B] hover:underline underline-offset-4"
                    >
                        Lihat semua
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                                <th className="px-5 py-3 font-semibold">Nama</th>
                                <th className="px-5 py-3 font-semibold">Telephone</th>
                                <th className="px-5 py-3 font-semibold">Negara Tujuan</th>
                                <th className="px-5 py-3 font-semibold">Tanggal Daftar</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">BI Checking</th>
                                <th className="px-5 py-3 font-semibold">Dana</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {kandidatList.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="px-5 py-10 text-center text-sm text-slate-400">
                                        {isLoading
                                            ? 'Memuat data...'
                                            : isError
                                              ? 'Gagal memuat data kandidat.'
                                              : 'Tidak ada kandidat yang cocok dengan pencarian.'}
                                    </td>
                                </tr>
                            )}
                            {kandidatList.map((k) => (
                                <tr key={k.id}>
                                    <td className="px-5 py-3.5 font-medium text-slate-700">{k.nama}</td>
                                    <td className="px-5 py-3.5 text-slate-500">{k.telephone}</td>
                                    <td className="px-5 py-3.5 text-slate-500">{k.tujuan}</td>
                                    <td className="px-5 py-3.5 text-slate-500">{formatTanggalSimpel(k.createdAt)}</td>
                                    <td className="px-5 py-3.5">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                                            {k.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                                            {k.ojk}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                                            {k.dana}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <p className="text-[13px] text-slate-400">
                            Halaman {currentPage} dari {totalPages} · {pagination.total ?? 0} kandidat
                        </p>

                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="text-[13px] text-slate-500 border border-slate-200 rounded-md px-2 py-1 focus:outline-none focus:border-[#16223B] focus:ring-2 focus:ring-[#16223B]/10"
                        >
                            {[10, 25, 50].map((size) => (
                                <option key={size} value={size}>
                                    {size} / halaman
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={goToPrevPage}
                            disabled={currentPage <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:border-[#16223B] hover:text-[#16223B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            onClick={goToNextPage}
                            disabled={currentPage >= totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:border-[#16223B] hover:text-[#16223B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
