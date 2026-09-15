"use client";

import { useState } from "react";
import { ArrowLeft, Save, User, FileText, GraduationCap, Image as ImageIcon, Upload, IdCard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useModifyKandidatMutation, useSeeOneKandidatQuery } from "@/hooks/api/kandidatSliceAPI";
import ModalSukses from "@/app/components/modal/suksesModal";
import EditKandidatForm from "@/app/components/form/formKandidat/formEditKandidat";

export default function EditKandidatPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useSeeOneKandidatQuery(id);
    const kandidatList = data?.data ?? {};
    const [updateKandidat, { isLoading: updateLoading, isError: errorUpdate }] = useModifyKandidatMutation(id);

    const [showSuccess, setShowSuccess] = useState(false);

    if (isLoading) {
        return <div className="p-8 text-center text-slate-400">Memuat data...</div>;
    }
    if (isError || !kandidatList) {
        return <div className="p-8 text-center text-red-500">Gagal memuat data kandidat.</div>;
    }

    const handleSubmit = async (formData) => {
        try {
            await updateKandidat({
                id,
                data: formData,
            }).unwrap();
            setShowSuccess(true);
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#EEF0F4]">
                {/* Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
                        <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#16223B] mb-4">
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </button>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-semibold text-slate-800">Edit Kandidat</h1>

                                <p className="text-sm text-slate-400 mt-1">Perbarui data kandidat dan periksa kembali dokumen yang tersedia.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className={
                                        "px-2.5 py-1 rounded-full text-xs font-semibold " +
                                        (kandidatList.status === "DRAFT" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700")
                                    }
                                >
                                    {kandidatList.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="max-w-6xl mx-auto px-5 sm:px-8 py-7">
                    <EditKandidatForm key={id} kandidatList={kandidatList} onSubmit={handleSubmit} updateLoading={updateLoading} />
                </main>
            </div>
            {/* {showSuccess && (<ModalSukses onClose={() => setShowModal(false)} />)} */}
            {showSuccess && <ModalSukses onClose={() => router.push("/data-awal")} />}
        </>
    );
}
