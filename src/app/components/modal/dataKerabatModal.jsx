"use client";

import { Users } from "lucide-react";

export default function DatadataModal({ data, onCancel, isLoading }) {
    const namaKerabat = data?.namaKerabat || "Belum ada data";
    const telephoneKerabat = data?.telephoneKerabat || "-";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

            <div className="relative w-80 mx-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-500" />
                    </div>
                </div>

                <h2 className="text-center text-gray-900 font-bold text-lg mb-1">Data Kerabat</h2>
                <p className="text-center text-gray-500 text-sm mb-5">
                    Informasi Kerabat dari <span className="font-medium text-gray-700">{data?.nama}</span>
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2.5">
                        <span className="text-xs text-gray-400">Nama</span>
                        <span className="text-sm font-medium text-gray-700 capitalize">{namaKerabat}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2.5">
                        <span className="text-xs text-gray-400">No. Telepon</span>
                        <span className="text-sm font-medium text-gray-700">{telephoneKerabat}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-xl border bg-green-800 border-gray-200 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}
