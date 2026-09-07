"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { useSeeOneUserQuery, useModifyMutation } from "@/hooks/api/userSliceAPI";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditUser() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useSeeOneUserQuery(id);
    const [modify, { isLoading: isSaving }] = useModifyMutation();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Admin");

    // Penanda: data untuk id ini sudah dimasukkan ke form apa belum
    const [loadedId, setLoadedId] = useState(null);

    // Isi form dengan data existing, tanpa useEffect
    if (data?.data && loadedId !== id) {
        setLoadedId(id);
        setEmail(data.data.email ?? "");
        setUsername(data.data.username ?? "");
        setRole(data.data.role ?? "Admin");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {};
        if (email) payload.email = email;
        if (username) payload.username = username;
        if (role) payload.role = role;
        if (password) payload.password = password;

        try {
            await modify({ id, data: payload }).unwrap();
            router.push("/data-user");
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    const inputClass =
        "w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white " +
        "focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 focus:border-[#16223B]";

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-sm text-rose-500 py-10">Gagal memuat data user.</div>;
    }

    return (
        <>
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
                    <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#16223B] mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800">Edit User</h1>
                            <p className="text-sm text-slate-400 mt-1">Perbarui data user.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Username</label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} required />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                Password Baru <span className="text-slate-400 font-normal">(kosongkan jika tidak diubah)</span>
                            </label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Role</label>
                            <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
                                <option value="Admin">Admin</option>
                                <option value="SuperAdmin">SuperAdmin</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-5 py-2.5 rounded-md border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] disabled:opacity-70"
                            >
                                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
