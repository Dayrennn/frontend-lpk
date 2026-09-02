"use client";

import { useState } from "react";
import { useSeeAllAsalQuery } from "@/hooks/api/asalSliceAPI";

export default function DataDiri({
    nama,
    setNama,
    tinggiBadan,
    setTinggiBadan,
    berat_badan,
    setBerat_badan,
    umur,
    setUmur,
    tgllahir,
    setTgllahir,
    provinsiId,
    setProvinsiId,
    kabupatenId,
    setKabupatenId,
    telephone,
    setTelephone,
}) {
    const [errors, setErrors] = useState({});
    const inputClass =
        "w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white " +
        "focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 focus:border-[#16223B]";

    const { data: asalData, isLoading: isAsalLoading, isError: isAsalError } = useSeeAllAsalQuery();
    const asalList = asalData?.data || [];

    const selectedProvinsi = asalList.find((p) => p.id === provinsiId);
    const kabupatenOptions = selectedProvinsi?.kabupaten || [];

    const borderClass = (field) => (errors[field] ? "border-rose-400" : "border-slate-300 focus:border-[#16223B]");

    const handleProvinsiChange = (e) => {
        const value = e.target.value;
        setProvinsiId(value);
        setKabupatenId(""); // reset kabupaten setiap ganti provinsi
        clearError("provinsiId");
    };
    const handleKabupatenChange = (e) => {
        const value = e.target.value;
        setKabupatenId(value);
        clearError("kabupatenId");
    };

    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>

                    <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tinggi Badan (cm)</label>

                    <input type="number" value={tinggiBadan} onChange={(e) => setTinggiBadan(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Berat Badan (kg)</label>

                    <input type="number" value={berat_badan} onChange={(e) => setBerat_badan(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Umur</label>

                    <input type="number" value={umur} onChange={(e) => setUmur(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tanggal Lahir</label>

                    <input type="date" value={tgllahir} onChange={(e) => setTgllahir(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Provinsi<span className="text-rose-600 ml-1">*</span>
                    </label>
                    <select className={inputClass + " " + borderClass("provinsiId")} value={provinsiId} onChange={handleProvinsiChange} disabled={isAsalLoading}>
                        <option value="">{isAsalLoading ? "Memuat provinsi..." : "-- Pilih Provinsi --"}</option>
                        {asalList.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.namaProvinsi}
                            </option>
                        ))}
                    </select>
                    {isAsalError && <p className="text-[11px] text-rose-600 mt-1">Gagal memuat data provinsi.</p>}
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Kabupaten/Kota<span className="text-rose-600 ml-1">*</span>
                    </label>
                    <select className={inputClass + " " + borderClass("kabupatenId")} value={kabupatenId} onChange={handleKabupatenChange} disabled={!provinsiId}>
                        <option value="">{provinsiId ? "-- Pilih Kabupaten/Kota --" : "Pilih provinsi terlebih dahulu"}</option>
                        {kabupatenOptions.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.namaKabupaten}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nomor Telephone</label>

                    <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} className={inputClass} />
                </div>
            </div>
        </>
    );
}
