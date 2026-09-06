"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/sidebar/page"; // sesuaikan path file sidebar kamu

export default function DashboardLayout({ children }) {
    // State untuk mobile (drawer)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State untuk desktop (collapse / ciut)
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
            {/* Sidebar Komponen (Tetap Dark Slate/Biru Kalem) */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />

            {/* Container Konten Utama */}
            <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
                {/* Topbar Khusus Layar Kecil (Mobile) - Menggunakan Warna Terang */}
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md lg:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            aria-label="Buka menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <span className="font-semibold text-slate-900 text-sm">Panel Admin</span>
                    </div>
                </header>

                {/* Area Konten Utama (Background Putih/Sangat Terang) */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
            </div>
        </div>
    );
}
