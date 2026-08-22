'use client';

import { ArrowRight, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useLoginMutation } from '@/hooks/api/userSliceAPI';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCredentials } from '@/hooks/api/authSliceAPI';

const inputClass =
    'w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white transition-colors ' +
    'placeholder:text-slate-400 focus:outline-none focus:border-[#16223B] focus:ring-2 focus:ring-[#16223B]/10';

export default function FormLogin() {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [notif, setNotif] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotif(null);

        try {
            const result = await login({ email, password }).unwrap();
            const user = result.data;

            dispatch(
                setCredentials({
                    user,
                }),
            );

            setNotif({ type: 'success', message: 'Login berhasil! Mengalihkan...' });

            setTimeout(() => {
                switch (user.role) {
                    case 'Admin':
                        router.push('/dashboard/admin');
                        break;
                    case 'Superadmin':
                        router.push('/dashboard/superadmin');
                        break;
                    default:
                        router.push('/login');
                }
            }, 800);
        } catch (error) {
            const status = error?.status;
            const serverMessage = error?.data?.message;

            const message =
                status === 401 || status === 400 || status === 404
                    ? 'Username atau password salah'
                    : serverMessage || 'Terjadi kesalahan, silakan coba lagi';

            setNotif({ type: 'error', message });
        }
    };

    return (
        <>
            {notif && (
                <div
                    className={
                        'flex items-center gap-2.5 px-4 py-3 rounded-md text-sm font-medium mb-4 ' +
                        (notif.type === 'success'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200')
                    }
                >
                    {notif.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                    ) : (
                        <XCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{notif.message}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                        Email<span className="text-rose-600 ml-1">*</span>
                    </label>
                    <input
                        className={inputClass}
                        required
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[13px] font-semibold text-slate-700">
                            Kata Sandi<span className="text-rose-600 ml-1">*</span>
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            className={inputClass + ' pr-10'}
                            required
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Masukkan kata sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-[#16223B] focus:ring-[#16223B]/20"
                    />
                    <span className="text-[13px] text-slate-600">Ingat saya di perangkat ini</span>
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Memproses...
                        </>
                    ) : (
                        <>
                            Masuk
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </>
    );
}
