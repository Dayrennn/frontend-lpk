"use client";

import { useState } from "react";
import {
    GraduationCap,
    LayoutDashboard,
    LogOut,
    ChevronDown,
    X,
    UsersRound,
    UserCheck,
    School,
    UserRoundX,
    Languages,
    BookOpen,
    UserMinus,
    FileUser,
    File,
    PanelLeftClose,
    PanelLeft,
} from "lucide-react";
import Link from "next/link";
import LogoutModal from "../modal/logoutModal";
import { useLogoutMutation, useGetMeQuery } from "@/hooks/api/userSliceAPI";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen = false, onClose = () => {}, isCollapsed = false, onToggleCollapse = () => {} }) {
    const pathname = usePathname();
    const [kelasOpen, setKelasOpen] = useState(false);

    const [logout, { isLoading }] = useLogoutMutation();
    const [showModalLogout, setShowModalLogout] = useState(false);

    const { data: meData } = useGetMeQuery();
    const profile = meData?.data;

    const isAdmin = profile?.role === "Admin";
    const isSuperadmin = profile?.role === "Superadmin";

    const displayName = profile?.username || "Admin Panitia";
    const displayEmail = profile?.email || "admin@programkerja.id";
    const initials = displayName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error("logout gagal", error);
        }
    };

    const dashboardLink = isAdmin ? "/dashboard/admin" : isSuperadmin ? "/dashboard/Superadmin" : "/";

    const isDashboard = pathname === dashboardLink;
    const isKandidat = pathname?.startsWith("/data-kandidat");
    const isPeserta = pathname?.startsWith("/data-peserta");
    const isKelas = pathname?.startsWith("/data-kelas");
    const isPesertaMundur = pathname?.startsWith("/data-mundur");
    const isCalonPmi = pathname?.startsWith("/data-cpmi");
    const isDataAwal = pathname?.startsWith("/data-awal");

    // Helper class untuk item navigasi
    const getNavItemClass = (isActive) =>
        `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative group ${
            isActive ? "bg-sky-500/15 text-sky-400 font-semibold border-l-2 border-sky-400 pl-[12px]" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
        } ${isCollapsed ? "justify-center px-0" : ""}`;

    return (
        <>
            {/* Overlay khusus mobile */}
            {isOpen && <div onClick={onClose} className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden" aria-hidden="true" />}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-slate-900 border-r border-slate-800 text-slate-200 transition-all duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
            >
                {/* Header / Brand */}
                <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/80">
                    <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? "justify-center w-full" : ""}`}>
                        <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5 text-sky-400" />
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-slate-100 leading-tight truncate">Panel Admin</p>
                                <p className="text-[11px] text-slate-400 leading-tight truncate">Pelatihan &amp; Penempatan</p>
                            </div>
                        )}
                    </div>

                    {/* Button Collapse Desktop */}
                    {!isCollapsed && (
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex text-slate-400 hover:text-slate-100 p-1.5 rounded-md hover:bg-slate-800 transition-colors"
                            title="Tutup Sidebar"
                        >
                            <PanelLeftClose className="w-5 h-5" />
                        </button>
                    )}

                    {/* Button Close Mobile */}
                    <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-100 p-1 rounded-md hover:bg-slate-800 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Button Expand saat Sidebar dalam keadaan Collapsed (Desktop) */}
                {isCollapsed && (
                    <div className="hidden lg:flex justify-center py-2 border-b border-slate-800/50">
                        <button onClick={onToggleCollapse} className="text-slate-400 hover:text-slate-100 p-2 rounded-md hover:bg-slate-800 transition-colors" title="Buka Sidebar">
                            <PanelLeft className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Profil Info */}
                <div
                    className={`flex items-center gap-3 py-3 rounded-xl bg-slate-800/40 border border-slate-800/80 my-3 transition-all ${
                        isCollapsed ? "mx-2 px-0 justify-center" : "mx-3 px-3"
                    }`}
                >
                    <div
                        className="w-9 h-9 rounded-full bg-slate-700/60 border border-slate-600/50 flex items-center justify-center text-xs font-bold text-slate-200 shrink-0"
                        title={displayName}
                    >
                        {initials}
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-200 truncate">{displayName}</p>
                            <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
                        </div>
                    )}
                </div>

                {/* Navigasi Utama */}
                <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                    <Link href={dashboardLink} className={getNavItemClass(isDashboard)} title={isCollapsed ? "Dashboard" : ""}>
                        <LayoutDashboard className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>

                    <Link href="/data-awal" className={getNavItemClass(isDataAwal)} title={isCollapsed ? "Data Awal" : ""}>
                        <File className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Data Awal</span>}
                    </Link>

                    <Link href="/data-kandidat" className={getNavItemClass(isKandidat)} title={isCollapsed ? "Data Masuk" : ""}>
                        <UsersRound className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Data Masuk</span>}
                    </Link>

                    <Link href="/data-peserta" className={getNavItemClass(isPeserta)} title={isCollapsed ? "Data Peserta" : ""}>
                        <UserCheck className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Data Peserta</span>}
                    </Link>

                    {/* Menu Dropdown Data Kelas */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setKelasOpen(!kelasOpen)}
                            title={isCollapsed ? "Data Kelas" : ""}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                                isKelas ? "text-sky-400 font-semibold" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                            } ${isCollapsed ? "justify-center px-0" : ""}`}
                        >
                            <div className="flex items-center gap-3">
                                <School className="w-4 h-4 shrink-0" />
                                {!isCollapsed && <span>Data Kelas</span>}
                            </div>
                            {!isCollapsed && <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${kelasOpen ? "rotate-180" : ""}`} />}
                        </button>

                        {kelasOpen && !isCollapsed && (
                            <div className="ml-4 pl-3 my-1 border-l border-slate-800 space-y-1">
                                <Link
                                    href="/data-kelas/belum-dapat"
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                        pathname === "/data-kelas/belum-dapat"
                                            ? "text-sky-400 bg-sky-500/10 font-semibold"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    }`}
                                >
                                    <UserRoundX className="w-3.5 h-3.5 shrink-0" />
                                    <span>Belum Dapat Kelas</span>
                                </Link>

                                <Link
                                    href="/data-kelas/inggris"
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                        pathname === "/data-kelas/inggris"
                                            ? "text-sky-400 bg-sky-500/10 font-semibold"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    }`}
                                >
                                    <Languages className="w-3.5 h-3.5 shrink-0" />
                                    <span>Kelas Inggris</span>
                                </Link>

                                <Link
                                    href="/data-kelas/jepang"
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                                        pathname === "/data-kelas/jepang" ? "text-sky-400 bg-sky-500/10 font-semibold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    }`}
                                >
                                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                                    <span>Kelas Jepang</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/data-mundur" className={getNavItemClass(isPesertaMundur)} title={isCollapsed ? "Data Peserta Mundur" : ""}>
                        <UserMinus className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Data Peserta Mundur</span>}
                    </Link>

                    <Link href="/data-cpmi" className={getNavItemClass(isCalonPmi)} title={isCollapsed ? "Data Calon PMI" : ""}>
                        <FileUser className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Data Calon PMI</span>}
                    </Link>
                </nav>

                {/* Footer / Logout */}
                <div className="p-3 border-t border-slate-800">
                    <button
                        onClick={() => setShowModalLogout(true)}
                        title={isCollapsed ? "Keluar" : ""}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors ${
                            isCollapsed ? "justify-center px-0" : ""
                        }`}
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>

            {showModalLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowModalLogout(false)} isLoading={isLoading} />}
        </>
    );
}
