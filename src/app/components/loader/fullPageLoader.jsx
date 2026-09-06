"use client";

export default function FullPageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Blur halaman */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/10" />

            {/* Loading bar merah */}
            <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
                <div className="h-full w-1/3 bg-red-500 animate-loader" />
            </div>
        </div>
    );
}
