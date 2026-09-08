"use client";

import ModalSukses from "@/app/components/modal/suksesModal";
import TambahUser from "@/app/components/modal/tambahUserModal";
import { useSeeAllUserQuery } from "@/hooks/api/userSliceAPI";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DataUser() {
    const { data, isLoading, isError } = useSeeAllUserQuery();
    const userList = data?.data ?? [];

    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    return (
        <>
            <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="font-swiss text-2xl font-semibold text-slate-800">Data Pengguna (User)</h1>
                    <p className="text-sm text-slate-400 mt-0.5">Kelola akun administrator dan superadministrator sistem.</p>
                </div>

                <button
                    onClick={() => setShowModalTambah(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors w-fit"
                >
                    <Plus className="w-4 h-4" />
                    Tambah User
                </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                                <th className="px-5 py-3 font-semibold">Email</th>
                                <th className="px-5 py-3 font-semibold">Username</th>
                                <th className="px-5 py-3 font-semibold">Role</th>
                                <th className="px-5 py-3 font-semibold text-right">Edit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {userList.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400">
                                        {isLoading ? "Memuat data..." : isError ? "Gagal memuat data pengguna." : "Belum ada data pengguna."}
                                    </td>
                                </tr>
                            )}

                            {userList.map((k) => (
                                <tr key={k.id} className="hover:bg-slate-50/60 align-top">
                                    <td className="px-5 py-3.5 font-medium text-slate-700">{k.email}</td>
                                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{k.username}</td>
                                    <td className="px-5 py-3.5 text-slate-500">{k.role}</td>
                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        <Link
                                            href={`/data-user/${k.id}`}
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
            </div>
            {showModalTambah && <TambahUser onClose={() => setShowModalTambah(false)} onSubmit={() => setShowSuccess(true)} />}
            {showSuccess && <ModalSukses onClose={() => setShowSuccess(false)} title="Berhasil" message="Berhasil Tambah User" />}
        </>
    );
}
