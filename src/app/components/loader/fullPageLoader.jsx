// app/components/loader/fullPageLoader.jsx
'use client';

import { Loader2 } from 'lucide-react';

export default function FullPageLoader({ label = 'Memuat...' }) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-3 bg-white z-50">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm text-gray-400">{label}</p>
        </div>
    );
}
