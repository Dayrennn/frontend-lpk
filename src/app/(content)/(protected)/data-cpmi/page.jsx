"use client";

import { useSeeKandidatCPMiQuery } from "@/hooks/api/kandidatSliceAPI";
import DataOrtuModal from "@/app/components/modal/dataOrtuModal";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import { useState } from "react";
import DataKerabatModal from "@/app/components/modal/dataKerabatModal";
import Link from "next/link";
import { formatTanggalSimpel } from "@/hooks/helper/formatTanggal";

export default function DataCpmi() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState("");

    const [showModalOrtu, setShowModalOrtu] = useState(false);
    const [selectedOrtu, setSelectedOrtu] = useState(null);

    const [showModalKerabat, setShowModalKerabat] = useState(false);
    const [selectedKerabat, setSelectedKerabat] = useState(null);

    const { data, isLoading, isError } = useSeeKandidatCPMiQuery({ page, limit: pageSize, search: keyword });
    const cpmi = data?.data?.kandidat ?? [];
    const pagination = data?.data?.pagination ?? {};

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

    const handleClickOrtu = (kandidat) => {
        setSelectedOrtu(kandidat);
        setShowModalOrtu(true);
    };

    const handleClickKerabat = (kandidat) => {
        setSelectedKerabat(kandidat);
        setShowModalKerabat(true);
    };

    return (
        <>
            <div className="mb-7">
                <h1 className="font-serif text-2xl font-semibold text-slate-800">Data Calon PMI</h1>
                <p className="text-sm text-slate-400 mt-0.5">Daftar Calon Pekerja Migran Indonesia</p>
            </div>
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
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                                <th className="px-5 py-3 font-semibold">Nama</th>
                                <th className="px-5 py-3 font-semibold">Alamat Sesuai Ktp</th>
                                <th className="px-5 py-3 font-semibold">No. Handphone</th>
                                <th className="px-5 py-3 font-semibold">No. Handphone 2</th>
                                <th className="px-5 py-3 font-semibold">Data Orang Tua</th>
                                <th className="px-5 py-3 font-semibold">Data Kerabat</th>
                                <th className="px-5 py-3 font-semibold">Job</th>
                                <th className="px-5 py-3 font-semibold">Dana</th>
                                <th className="px-5 py-3 font-semibold">Tanggal Mendapat Job</th>
                                <th className="px-5 py-3 font-semibold">Tanggal Berangkat</th>
                                <th className="px-5 py-3 font-semibold">Perusahaan Penempatan</th>
                                <th className="px-5 py-3 font-semibold">Durasi Kontrak</th>
                                <th className="px-5 py-3 font-semibold">LPK / Tempat Pelatihan</th>
                                <th className="px-5 py-3 font-semibold">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {cpmi.length === 0 && (
                                <tr>
                                    <td colSpan={11} className="px-5 py-10 text-center text-sm text-slate-400">
                                        {isLoading ? "Memuat data..." : isError ? "Gagal memuat data kandidat." : "Tidak ada kandidat yang cocok dengan pencarian."}
                                    </td>
                                </tr>
                            )}
                            {cpmi.map((k) => (
                                <tr key={k.id} className="hover:bg-slate-50/60 align-top">
                                    <td className="px-5 py-3.5 font-medium text-slate-700 capitalize whitespace-nowrap">{k.nama}</td>
                                    <td className="px-5 py-3.5 text-slate-500 capitalize whitespace-nowrap">{k.alamatSesuaiKTP}</td>
                                    <td className="px-5 py-3.5 text-slate-500 capitalize whitespace-nowrap">{k.telephone}</td>
                                    <td className="px-5 py-3.5 text-slate-500 capitalize whitespace-nowrap">{k.telephone_sekunder}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                                        <button onClick={() => handleClickOrtu(k)} className="text-blue-500 hover:text-blue-700 underline">
                                            Data Orang Tua
                                        </button>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                                        <button onClick={() => handleClickKerabat(k)} className="text-blue-500 hover:text-blue-700 underline">
                                            Data Kerabat
                                        </button>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.job}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.dana}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{formatTanggalSimpel(k.tanggalTerima)}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{formatTanggalSimpel(k.tanggalBerangkat)}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.perusahaanPenempatan}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.kontrak}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.tempatPelatihan}</td>
                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        <Link
                                            href={`/data-cpmi/${k.id}`}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-600 hover:border-[#16223B] hover:text-[#16223B] transition-colors"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Edit
                                        </Link>
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
            ({showModalOrtu && <DataOrtuModal data={selectedOrtu} onCancel={() => setShowModalOrtu(false)} isLoading={false} />}) (
            {showModalKerabat && <DataKerabatModal data={selectedKerabat} onCancel={() => setShowModalKerabat(false)} isLoading={false} />})
        </>
    );
}
