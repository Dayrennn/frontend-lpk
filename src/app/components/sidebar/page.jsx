'use client';

import { useState } from 'react';
import { GraduationCap, LayoutDashboard, Users, LogOut, ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import LogoutModal from '../modal/logoutModal';
import { useLogoutMutation, useGetMeQuery } from '@/hooks/api/userSliceAPI';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
    const pathname = usePathname();
    const [profileOpen, setProfileOpen] = useState(false);

    const [logout, { isLoading }] = useLogoutMutation();
    const [showModalLogout, setShowModalLogout] = useState(false);

    const { data: meData } = useGetMeQuery();
    const profile = meData?.data;

    const isAdmin = profile?.role === 'Admin';
    const isSuperadmin = profile?.role === 'Superadmin';

    const displayName = profile?.username || 'Admin Panitia';
    const displayEmail = profile?.email || 'admin@programkerja.id';
    const initials = displayName
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error('logout gagal', error);
        }
    };

    const dashboardLink = isAdmin ? '/dashboard/admin' : isSuperadmin ? '/dashboard/Superadmin' : '/';

    const isDashboard = pathname === dashboardLink;
    const isKandidat = pathname?.startsWith('/data-kandidat');

    return (
        <>
            {/* Overlay khusus mobile, klik untuk menutup drawer */}
            {isOpen && (
                <div onClick={onClose} className="fixed inset-0 z-30 bg-black/40 lg:hidden" aria-hidden="true" />
            )}

            <aside
                className={
                    isOpen
                        ? 'fixed inset-y-0 left-0 z-40 w-64 flex flex-col text-white overflow-hidden transition-transform duration-200 lg:translate-x-0 translate-x-0'
                        : 'fixed inset-y-0 left-0 z-40 w-64 flex flex-col text-white overflow-hidden transition-transform duration-200 lg:translate-x-0 -translate-x-full'
                }
                style={{ background: 'linear-gradient(180deg,#182742,#0F1A2E)' }}
            >
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                    }}
                />

                {/* Brand */}
                <div className="relative flex items-center gap-2.5 px-6 py-6 border-b border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-[#D9B25C] flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#16223B]" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-serif text-sm font-semibold text-white leading-tight truncate">
                            Panel Admin
                        </p>
                        <p className="text-[11px] text-white/50 leading-tight truncate">Pelatihan &amp; Penempatan</p>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white shrink-0">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Profil */}
                <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="relative flex items-center gap-3 px-5 py-4 border-b border-white/10 hover:bg-white/5 transition-colors text-left"
                >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold shrink-0">
                        {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{displayName}</p>
                        <p className="text-[11px] text-white/50 truncate">{displayEmail}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                </button>

                {/* Navigasi */}
                <nav className="relative flex-1 px-3 py-4 space-y-1">
                    <Link
                        href={dashboardLink}
                        className={
                            isDashboard
                                ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors bg-[#D9B25C] text-[#16223B] font-semibold'
                                : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-white/70 hover:bg-white/5 hover:text-white'
                        }
                    >
                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                        Dashboard
                    </Link>
                    <Link
                        href="/data-kandidat"
                        className={
                            isKandidat
                                ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors bg-[#D9B25C] text-[#16223B] font-semibold'
                                : 'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-white/70 hover:bg-white/5 hover:text-white'
                        }
                    >
                        <Users className="w-4 h-4 shrink-0" />
                        Data Kandidat Masuk
                    </Link>
                </nav>

                {/* Logout */}
                <div className="relative px-3 py-4 border-t border-white/10">
                    <button
                        onClick={() => setShowModalLogout(true)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/5 hover:text-rose-300 transition-colors"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        Keluar
                    </button>
                </div>
            </aside>
            {showModalLogout && (
                <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowModalLogout(false)}
                    isLoading={isLoading}
                />
            )}
        </>
    );
}
