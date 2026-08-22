'use client';

import { LogOut } from 'lucide-react';

export default function LogoutModal({ onConfirm, onCancel, isLoading }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

            <div className="relative w-80 mx-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                        <LogOut className="w-6 h-6 text-red-500" />
                    </div>
                </div>

                <h2 className="text-center text-gray-900 font-bold text-lg mb-1">Keluar dari Akun?</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Kamu akan keluar dari sesi ini. Apakah kamu yakin?
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-60"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-semibold transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                Memproses...
                            </>
                        ) : (
                            'Ya, Keluar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
