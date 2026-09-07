'use client';

import { useState } from 'react';
import {
    Search,
    Loader2,
    AlertCircle,
    User,
    Ruler,
    Weight,
    Cake,
    CalendarDays,
    MapPin,
    Landmark,
    GraduationCap,
    Wallet,
    Phone,
    MessageSquareWarning,
    PackageSearch,
    CheckCircle,
} from 'lucide-react';
import { useSeeCheckKodeKandidatMutation } from '@/hooks/api/kandidatSliceAPI';

// Mapping status -> warna badge, silakan tambah/ubah sesuai daftar status yang dipakai di backend
const STATUS_STYLE = {
    DITERIMA: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
    LULUS: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
    PROSES: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
    PERBAIKAN: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500' },
    DITOLAK: { bg: 'bg-rose-50', text: 'text-rose-600', dot: 'bg-rose-500' },
    MUNDUR: { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' },
};

function getStatusStyle(status) {
    return STATUS_STYLE[status?.toUpperCase()] ?? { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
}

function formatTanggal(iso) {
    if (!iso) return '-';
    try {
        return new Date(iso).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}

function DetailRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0">
            <div className="w-8 h-8 rounded-lg bg-[#16223B]/5 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#16223B]" />
            </div>
            <div className="min-w-0">
                <p className="text-[11px] text-slate-400 leading-tight">{label}</p>
                <p className="text-sm font-medium text-slate-700 break-words">{value ?? '-'}</p>
            </div>
        </div>
    );
}

export default function VerifikasiStatusPage() {
    const [kode, setKode] = useState('');
    const [submittedKode, setSubmittedKode] = useState('');
    const [checkKode, { data, isLoading, isError, error }] = useSeeCheckKodeKandidatMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = kode.trim();
        if (!trimmed) return;
        setSubmittedKode(trimmed);
        checkKode(trimmed);
    };

    const kandidat = data?.data;
    const statusStyle = getStatusStyle(kandidat?.status);

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: '#EEF0F4',
                backgroundImage: 'radial-gradient(#D7DCE5 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div className="w-full max-w-xl">
                {/* Header ala kartu resi */}
                <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#16223B] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-black/10">
                        <PackageSearch className="w-6 h-6 text-[#D9B25C]" />
                    </div>
                    <p className="text-[11px] font-semibold tracking-[0.14em] text-[#B8862E] uppercase mb-2">
                        Cek Status Pendaftaran
                    </p>
                    <h1 className="font-swiss text-2xl sm:text-3xl font-semibold text-slate-800">
                        Lacak Status Kandidat
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Masukkan kode registrasi kamu, seperti mengecek nomor resi paket.
                    </p>
                </div>

                {/* Form input kode */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-3"
                >
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                            placeholder="Masukkan kode registrasi, contoh: 323098"
                            className="w-full pl-10 pr-3 py-3 rounded-md border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16223B]/20 focus:border-[#16223B]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !kode.trim()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Mencari...
                            </>
                        ) : (
                            <>
                                <Search className="w-4 h-4" />
                                Cek Status
                            </>
                        )}
                    </button>
                </form>

                {/* Error state */}
                {isError && (
                    <div className="mt-5 bg-white rounded-2xl border border-rose-100 shadow-sm p-5 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Kode registrasi tidak ditemukan</p>
                            <p className="text-xs text-slate-500 mt-1">
                                {error?.data?.message ??
                                    `Periksa kembali kode "${submittedKode}" yang kamu masukkan, lalu coba lagi.`}
                            </p>
                        </div>
                    </div>
                )}

                {/* Hasil pencarian */}
                {kandidat && !isError && (
                    <div className="mt-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Header hasil: kode + status badge, mirip header resi paket */}
                        <div className="px-5 py-4 sm:px-6 sm:py-5 bg-[#16223B] flex items-center justify-between gap-3">
                            <div>
                                <p className="text-[11px] text-white/50 uppercase tracking-wide">Kode Registrasi</p>
                                <p className="text-lg font-semibold text-white tracking-wide">
                                    {kandidat.kodeRegistrasi}
                                </p>
                            </div>
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                                {kandidat.status}
                            </span>
                        </div>

                        {/* Keterangan status, kalau ada (mis. alasan PERBAIKAN) */}
                        {kandidat.keterangan && (
                            <div className="px-5 sm:px-6 py-3 bg-amber-50 border-b border-amber-100 flex items-start gap-2.5">
                                <MessageSquareWarning className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-700">{kandidat.keterangan}</p>
                            </div>
                        )}

                        {/* Tahapan Proses */}
                        <div className="px-5 sm:px-6 pt-5 pb-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Tahapan Proses
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Pantau perkembangan pendaftaran dan pemeriksaan OJK.
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Garis penghubung */}
                                <div className="hidden sm:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-slate-200" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                                    {/* ================================================= */}
                                    {/* TAHAP 1 - VERIFIKASI PENDAFTARAN */}
                                    {/* ================================================= */}
                                    <div
                                        className={`relative rounded-xl border p-4 ${
                                            kandidat.status === 'TERVERIFIKASI'
                                                ? 'border-emerald-200 bg-emerald-50/70'
                                                : kandidat.status === 'PERBAIKAN'
                                                  ? 'border-amber-200 bg-amber-50/70'
                                                  : kandidat.status === 'MUNDUR'
                                                    ? 'border-slate-200 bg-slate-50'
                                                    : 'border-blue-200 bg-blue-50/60'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Icon status */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                                    kandidat.status === 'TERVERIFIKASI'
                                                        ? 'bg-emerald-100'
                                                        : kandidat.status === 'PERBAIKAN'
                                                          ? 'bg-amber-100'
                                                          : kandidat.status === 'MUNDUR'
                                                            ? 'bg-slate-200'
                                                            : 'bg-blue-100'
                                                }`}
                                            >
                                                {kandidat.status === 'TERVERIFIKASI' ? (
                                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                                ) : kandidat.status === 'PERBAIKAN' ? (
                                                    <AlertCircle className="w-5 h-5 text-amber-600" />
                                                ) : kandidat.status === 'MUNDUR' ? (
                                                    <AlertCircle className="w-5 h-5 text-slate-500" />
                                                ) : (
                                                    <PackageSearch className="w-5 h-5 text-blue-600" />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                        Tahap 1
                                                    </p>

                                                    <span
                                                        className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                                            kandidat.status === 'TERVERIFIKASI'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : kandidat.status === 'PERBAIKAN'
                                                                  ? 'bg-amber-100 text-amber-700'
                                                                  : kandidat.status === 'MUNDUR'
                                                                    ? 'bg-slate-200 text-slate-600'
                                                                    : 'bg-blue-100 text-blue-700'
                                                        }`}
                                                    >
                                                        {kandidat.status === 'TERVERIFIKASI'
                                                            ? 'SELESAI'
                                                            : kandidat.status === 'PERBAIKAN'
                                                              ? 'PERLU PERBAIKAN'
                                                              : kandidat.status === 'MUNDUR'
                                                                ? 'MUNDUR'
                                                                : 'DALAM PROSES'}
                                                    </span>
                                                </div>

                                                <p className="text-sm font-semibold text-slate-800 mt-1">
                                                    Verifikasi Pendaftaran
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                    {kandidat.status === 'TERVERIFIKASI'
                                                        ? 'Data dan berkas pendaftaran telah diverifikasi oleh panitia.'
                                                        : kandidat.status === 'PERBAIKAN'
                                                          ? 'Terdapat data atau berkas yang perlu diperbaiki.'
                                                          : kandidat.status === 'MUNDUR'
                                                            ? 'Proses pendaftaran telah dihentikan.'
                                                            : 'Data pendaftaran sedang menunggu proses verifikasi panitia.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================================================= */}
                                    {/* TAHAP 2 - OJK */}
                                    {/* ================================================= */}
                                    <div
                                        className={`relative rounded-xl border p-4 ${
                                            kandidat.ojk === 'LOLOS' || kandidat.ojk === 'MANDIRI'
                                                ? 'border-emerald-200 bg-emerald-50/70'
                                                : kandidat.ojk === 'TIDAK_LOLOS'
                                                  ? 'border-rose-200 bg-rose-50/70'
                                                  : kandidat.ojk === 'CHECKING'
                                                    ? 'border-amber-200 bg-amber-50/70'
                                                    : kandidat.status === 'TERVERIFIKASI'
                                                      ? 'border-[#D9B25C]/50 bg-[#D9B25C]/10'
                                                      : 'border-slate-200 bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Icon status */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                                    kandidat.ojk === 'LOLOS' || kandidat.ojk === 'MANDIRI'
                                                        ? 'bg-emerald-100'
                                                        : kandidat.ojk === 'TIDAK_LOLOS'
                                                          ? 'bg-rose-100'
                                                          : kandidat.ojk === 'CHECKING'
                                                            ? 'bg-amber-100'
                                                            : kandidat.status === 'TERVERIFIKASI'
                                                              ? 'bg-[#D9B25C]/20'
                                                              : 'bg-slate-200'
                                                }`}
                                            >
                                                {kandidat.ojk === 'LOLOS' || kandidat.ojk === 'MANDIRI' ? (
                                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                                ) : kandidat.ojk === 'TIDAK_LOLOS' ? (
                                                    <AlertCircle className="w-5 h-5 text-rose-600" />
                                                ) : (
                                                    <Landmark
                                                        className={`w-5 h-5 ${
                                                            kandidat.ojk === 'CHECKING'
                                                                ? 'text-amber-600'
                                                                : kandidat.status === 'TERVERIFIKASI'
                                                                  ? 'text-[#B8862E]'
                                                                  : 'text-slate-400'
                                                        }`}
                                                    />
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                                        Tahap 2
                                                    </p>

                                                    <span
                                                        className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                                            kandidat.ojk === 'LOLOS' || kandidat.ojk === 'MANDIRI'
                                                                ? 'bg-emerald-100 text-emerald-700'
                                                                : kandidat.ojk === 'TIDAK_LOLOS'
                                                                  ? 'bg-rose-100 text-rose-700'
                                                                  : kandidat.ojk === 'CHECKING'
                                                                    ? 'bg-amber-100 text-amber-700'
                                                                    : 'bg-slate-200 text-slate-500'
                                                        }`}
                                                    >
                                                        {kandidat.ojk === 'LOLOS'
                                                            ? 'LOLOS'
                                                            : kandidat.ojk === 'MANDIRI'
                                                              ? 'MANDIRI'
                                                              : kandidat.ojk === 'TIDAK_LOLOS'
                                                                ? 'TIDAK LOLOS'
                                                                : kandidat.ojk === 'CHECKING'
                                                                  ? 'SEDANG DIPERIKSA'
                                                                  : 'MENUNGGU'}
                                                    </span>
                                                </div>

                                                <p className="text-sm font-semibold text-slate-800 mt-1">
                                                    Pemeriksaan OJK
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                                    {kandidat.ojk === 'LOLOS'
                                                        ? 'Pemeriksaan OJK telah selesai dan dinyatakan lolos.'
                                                        : kandidat.ojk === 'MANDIRI'
                                                          ? 'Pemeriksaan dilakukan secara mandiri dan telah diselesaikan.'
                                                          : kandidat.ojk === 'TIDAK_LOLOS'
                                                            ? 'Hasil pemeriksaan OJK belum memenuhi persyaratan.'
                                                            : kandidat.ojk === 'CHECKING'
                                                              ? 'Data sedang dalam proses pemeriksaan OJK.'
                                                              : kandidat.status === 'TERVERIFIKASI'
                                                                ? 'Pendaftaran telah terverifikasi. Tahap berikutnya adalah pemeriksaan OJK.'
                                                                : 'Pemeriksaan OJK dilakukan setelah pendaftaran terverifikasi.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail data kandidat */}
                        <div className="px-5 sm:px-6 py-2">
                            <DetailRow icon={User} label="Nama" value={kandidat.nama} />
                            <DetailRow
                                icon={Ruler}
                                label="Tinggi Badan"
                                value={kandidat.tinggi ? `${kandidat.tinggi} cm` : '-'}
                            />
                            <DetailRow
                                icon={Weight}
                                label="Berat Badan"
                                value={kandidat.berat_badan ? `${kandidat.berat_badan} kg` : '-'}
                            />
                            <DetailRow
                                icon={Cake}
                                label="Umur"
                                value={kandidat.umur ? `${kandidat.umur} tahun` : '-'}
                            />
                            <DetailRow
                                icon={CalendarDays}
                                label="Tanggal Lahir"
                                value={formatTanggal(kandidat.tgllahir)}
                            />
                            <DetailRow icon={MapPin} label="Negara Tujuan" value={kandidat.tujuan} />
                            <DetailRow icon={GraduationCap} label="Pendidikan" value={kandidat.pendidikan} />
                            <DetailRow icon={MapPin} label="Asal Daerah" value={kandidat.asal} />
                            <DetailRow icon={Wallet} label="Sumber Dana" value={kandidat.dana} />
                            <DetailRow icon={Phone} label="Telepon" value={kandidat.telephone} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
