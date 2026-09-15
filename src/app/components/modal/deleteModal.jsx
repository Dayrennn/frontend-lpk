"use client";

import { useState } from "react";
import ModalSukses from "./suksesModal";
import { Trash, X } from "lucide-react";

export default function RemoveModal({ onCancel, title, successTitle, initialData, successMessage, displayName, onConfirm }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleRemove = async () => {
        try {
            setIsLoading(true);
            setIsError(false);
            await onConfirm(initialData.id); // parent yang urus sliceAPI
            setShowSuccess(true);
        } catch (err) {
            setIsError(true);
            setErrorMsg(err?.data?.message || "Terjadi kesalahan");
        } finally {
            setIsLoading(false);
        }
    };

    if (showSuccess) {
        return <ModalSukses title={successTitle} onClose={onCancel} message={successMessage} />;
    }

    const namaItem = initialData?.[displayName] || "item ini";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel} />

            <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-rose-50 border border-rose-200">
                            <Trash className="w-4 h-4 text-rose-600" />
                        </span>
                        <h2 className="font-swiss font-semibold text-slate-800 text-sm">{title}</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="px-5 py-5 space-y-4">
                    <p className="text-sm text-slate-500 text-center leading-relaxed">
                        Apakah kamu yakin ingin menghapus <span className="font-semibold text-slate-800 capitalize">{namaItem}</span>?
                        <br />
                        Tindakan ini tidak dapat dibatalkan.
                    </p>

                    {isError && <p className="text-xs text-rose-600 text-center bg-rose-50 border border-rose-200 rounded-md py-2 px-3">{errorMsg}</p>}

                    <div className="flex gap-2.5 pt-1">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 rounded-md border border-slate-300 text-slate-600 text-sm font-medium hover:border-[#16223B] hover:text-[#16223B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleRemove}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 rounded-md bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Menghapus..." : "Hapus"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
