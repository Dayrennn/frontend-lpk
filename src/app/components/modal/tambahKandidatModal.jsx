"use client";

import { useState } from "react";
import { X, Upload, FileText } from "lucide-react";
import { useCreateKandidatAdminMutation } from "@/hooks/api/kandidatSliceAPI";
import ModalSukses from "./suksesModal";

export default function TambahKandidatModal({ onClose, onSubmit }) {
    const [nama, setNama] = useState("");
    const [telephone, setTelephone] = useState("");
    const [pic, setPic] = useState("");
    const [cv, setCv] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const [createKandidat, { data, isLoading, iserror }] = useCreateKandidatAdminMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("telephone", telephone);
        if (pic) {
            formData.append("pic", pic);
        }
        if (cv) {
            formData.append("cv", cv);
        }

        try {
            await createKandidat({ data: formData }).unwrap();
            onClose();
            setShowSuccess(true);
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    const handleFileChange = (setter, field) => (e) => {
        const file = e.target.files?.[0] || null;
        setter(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">Tambah Kandidat</h2>

                        <p className="mt-0.5 text-sm text-slate-400">Tambahkan data kandidat baru.</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 px-6 py-5">
                        {/* Nama */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Nama <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Masukkan nama kandidat"
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                            />
                        </div>

                        {/* Telephone */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Telephone <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="tel"
                                name="telephone"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                placeholder="Contoh: 081234567890"
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                            />
                        </div>

                        {/* PIC */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                PIC
                                <span className="ml-1 text-xs font-normal text-slate-400">(Opsional)</span>
                            </label>

                            <input
                                type="text"
                                name="pic"
                                value={pic}
                                onChange={(e) => setPic(e.target.value)}
                                placeholder="Masukkan nama PIC"
                                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                            />
                        </div>

                        {/* Upload PDF */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Upload PDF
                                <span className="ml-1 text-xs font-normal text-slate-400">(Opsional)</span>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-slate-300 px-4 py-4 hover:border-[#16223B] hover:bg-slate-50 transition-colors">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100">
                                    {cv ? <FileText className="h-5 w-5 text-[#16223B]" /> : <Upload className="h-5 w-5 text-slate-400" />}
                                </div>

                                <div className="min-w-0 flex-1">
                                    {cv ? (
                                        <>
                                            <p className="truncate text-sm font-medium text-slate-700">{cv}</p>

                                            <p className="text-xs text-slate-400">File PDF berhasil dipilih</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-medium text-slate-600">Pilih file PDF</p>

                                            <p className="text-xs text-slate-400">Format PDF saja</p>
                                        </>
                                    )}
                                </div>

                                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange(setCv, "cv")} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-md bg-[#16223B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e2d4d] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                        >
                            {isLoading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
