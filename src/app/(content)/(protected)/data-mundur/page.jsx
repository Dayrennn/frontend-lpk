'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSeeAllKandidatMundurQuery } from '@/hooks/api/kandidatSliceAPI';
import { formatTanggalSimpel } from '@/hooks/helper/formatTanggal';
import StatusPill from '@/app/components/statusPill';

const statusColorMap = {
    DRAFT: 'bg-slate-50 text-slate-600 border-slate-200',
    TERVERIFIKASI: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PERBAIKAN: 'bg-amber-50 text-amber-700 border-amber-200',
    MUNDUR: 'bg-slate-50 text-slate-600 border-slate-200',
};

const ojkColorMap = {
    BELUM: 'bg-slate-50 text-slate-600 border-slate-200',
    CHECKING: 'bg-amber-50 text-amber-700 border-amber-200',
    LOLOS: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    TIDAK_LOLOS: 'bg-rose-50 text-rose-700 border-rose-200',
    MANDIRI: 'bg-blue-50 text-blue-700 border-blue-200',
};

const danaColorMap = {
    MANDIRI: 'bg-blue-50 text-blue-700 border-blue-200',
    TALANG: 'bg-violet-50 text-violet-700 border-violet-200',
};

export default function DataKandidatMundur() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState('');

    const { data, isLoading, isError } = useSeeAllKandidatMundurQuery({ page, limit: pageSize, search: keyword });

    const kandidatList = data?.data?.kandidat ?? [];
    const pagination = data?.data?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

    const currentPage = pagination.page ?? 1;
    const totalPages = pagination.totalPages ?? 1;

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
        setPage(1);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(1);
    };

    const goToPrevPage = () => setPage((p) => Math.max(1, p - 1));
    const goToNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

    return (
        <>
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold text-slate-800">Data Kandidat Mundur</h1>
                <p className="text-sm text-slate-400 mt-0.5">
                    Daftar kandidat yang mendaftar program pelatihan &amp; penempatan kerja.
                </p>
            </div>

            {/* Ringkasan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                    <p className="text-xl font-semibold text-slate-800">{pagination.total ?? 0}</p>
                    <p className="text-[13px] text-slate-400 mt-0.5">Total Kandidat</p>
                </div>
            </div>

            {/* Pencarian */}
            <div className="mb-4">
                <div className="relative max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama kandidat..."
                        value={keyword}
                        onChange={handleKeywordChange}
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-md text-black text-sm bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#16223B] focus:ring-2 focus:ring-[#16223B]/10"
                    />
                </div>
            </div>

            {/* Tabel */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                                <th className="px-5 py-3 font-semibold">Nama</th>
                                <th className="px-5 py-3 font-semibold">Umur</th>
                                <th className="px-5 py-3 font-semibold">Tujuan</th>
                                <th className="px-5 py-3 font-semibold">Pendidikan</th>
                                <th className="px-5 py-3 font-semibold">Asal</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 font-semibold">OJK</th>
                                <th className="px-5 py-3 font-semibold">Tanggal Daftar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {kandidatList.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-400">
                                        {isLoading
                                            ? 'Memuat data...'
                                            : isError
                                              ? 'Gagal memuat data kandidat.'
                                              : 'Tidak ada kandidat yang cocok dengan pencarian.'}
                                    </td>
                                </tr>
                            )}

                            {kandidatList.map((k) => (
                                <tr key={k.id} className="hover:bg-slate-50/60 align-top">
                                    <td className="px-5 py-3.5 font-medium text-slate-700 capitalize whitespace-nowrap">
                                        {k.nama}
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.umur} th</td>
                                    <td className="px-5 py-3.5 text-slate-500 capitalize whitespace-nowrap">
                                        {k.tujuan}
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.pendidikan}</td>
                                    <td className="px-5 py-3.5 text-slate-500 capitalize whitespace-nowrap">
                                        {k.asal}
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <StatusPill value={k.status} colorMap={statusColorMap} />
                                    </td>

                                    <td className="px-5 py-3.5">
                                        <StatusPill value={k.ojk} colorMap={ojkColorMap} />
                                    </td>

                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                                        {formatTanggalSimpel(k.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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
