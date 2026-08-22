'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/sidebar/page';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* pl-64 harus sama dengan lebar sidebar (w-64) */}
            <div className="lg:pl-64">
                {/* Topbar buat toggle sidebar di layar kecil */}
                <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-100 bg-white px-4 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 hover:text-gray-900"
                        aria-label="Buka menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-gray-900">Panel Admin</span>
                </header>

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
