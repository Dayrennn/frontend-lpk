'use client';

import { CheckCircle2, X } from 'lucide-react';

export default function ModalSukses({ onClose, title = 'Berhasil', message = 'Data berhasil disimpan.' }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal card */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="px-6 pt-8 pb-6 flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>

                    <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{message}</p>

                    <button
                        onClick={onClose}
                        className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}
