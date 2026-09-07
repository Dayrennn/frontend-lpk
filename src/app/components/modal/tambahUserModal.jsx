"use client";

import { useRegisterMutation } from "@/hooks/api/userSliceAPI";
import FormOtp from "../form/formOtp";
import { X } from "lucide-react";
import { useState } from "react";
import ModalSukses from "./suksesModal";

export default function TambahUser({ onClose, onSubmit, onSuccess }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showSuccess, setShowSuccess] = useState(false);

    const [step, setStep] = useState("form");
    const handleFormSuccess = (result, formData) => {
        if (FormOtp) {
            setEmail(formData.email);
            setStep("otp");
        } else {
            setShowSuccess(true);
        }
    };

    const handleOtpSuccess = () => {
        setShowSuccess(true);
    };

    const [register, { isLoading, isError }] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await register({ email, username, password }).unwrap();

            // simpan bentar buat kirim otp
            const emailValue = email;

            setEmail(emailValue);
            setUsername("");
            setPassword("");

            setStep("otp");
        } catch (err) {
            console.error("EROR", err);
        }
    };

    if (showSuccess) {
        <ModalSukses onClose={onClose} title="Berhasil" message="Berhasil Tambah Data User" />;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">Tambah User</h2>

                        <p className="mt-0.5 text-sm text-slate-400">Tambahkan User baru.</p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div>
                    {step === "form" && (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 px-6 py-5">
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Masukkan Email"
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                                />
                            </div>
                            <div className="space-y-4 px-6 py-5">
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Masukkan Username"
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                                />
                            </div>
                            <div className="space-y-4 px-6 py-5">
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                    Password <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contoh: 081234567890"
                                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#16223B] focus:outline-none focus:ring-2 focus:ring-[#16223B]/10"
                                />
                            </div>
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
                    )}
                    {step === "otp" && FormOtp && <FormOtp email={email} onCancel={onClose} onSuccess={handleOtpSuccess} />}
                </div>
            </div>
        </div>
    );
}
