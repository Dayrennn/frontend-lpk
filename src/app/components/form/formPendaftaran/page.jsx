"use client";

import { useRef, useState } from "react";
import { GraduationCap, ChevronLeft, ChevronRight, Send, FileText, IdCard, Users, Award, UploadCloud, CircleCheck, Circle, Pencil, Loader2, AlertCircle } from "lucide-react";
import { useCreateKandidatMutation } from "@/hooks/api/kandidatSliceAPI";
import Link from "next/link";
import { useSeeAllAsalQuery } from "@/hooks/api/asalSliceAPI";
import { calculateAge } from "@/hooks/helper/calculateAge";

const NEGARA_OPTIONS = ["Jepang", "Kuwait", "Turkey", "Albania", "Montenegro", "Lainnya"];
const PENDIDIKAN_OPTIONS = ["SD", "SMP", "SMA/SMK", "D3", "S1", "S2", "S3"];

const STEPS = [
    { id: 1, label: "Data Diri" },
    { id: 2, label: "Akademik & Tujuan" },
    { id: 3, label: "Berkas Dokumen" },
    { id: 4, label: "Tinjau & Kirim" },
];

const inputClass =
    "w-full px-3.5 py-2.5 border rounded-md text-sm text-slate-800 bg-white transition-colors " +
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#16223B]/10";

const uploadRowClass = "flex items-center gap-3 px-4 py-3.5 bg-white";
const uploadButtonClass =
    "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-600 " +
    "hover:border-[#16223B] hover:text-[#16223B] cursor-pointer transition-colors";

// Field-level error message, shown under an input
function FieldError({ message }) {
    if (!message) return null;
    return (
        <p className="flex items-center gap-1 text-[11px] text-rose-600 mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            {message}
        </p>
    );
}

export default function FormRegistration({ step, setStep }) {
    const formRef = useRef(null);

    // field biasa
    const [nama, setNama] = useState("");
    const [tinggiBadan, setTinggiBadan] = useState("");
    const [berat_badan, setBerat_badan] = useState("");
    const [tgllahir, setTgllahir] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [tujuanLainnya, setTujuanLainnya] = useState("");
    const [pendidikan, setPendidikan] = useState("");
    const [provinsiId, setProvinsiId] = useState("");
    const [kabupatenId, setKabupatenId] = useState("");
    const [bidang_pekerjaan, setBidang_pekerjaan] = useState("");
    const [telephone, setTelephone] = useState("");
    const [telephone_sekunder, setTelephone_sekunder] = useState("");
    const [dana, setDana] = useState("");
    const [agama, setAgama] = useState("");
    const [pernikahan, setPernikahan] = useState("");
    const [tempatLahir, setTempatLahir] = useState("");

    // field gambar
    const [cv, setCv] = useState(null);
    const [kk, setKK] = useState(null);
    const [ktp, setKtp] = useState(null);
    const [ktpPendamping, setKtpPendamping] = useState(null);
    const [ijazah, setIjazah] = useState(null);
    const [sertifikat, setSertifikat] = useState(null);

    // error state: { fieldName: 'pesan error' }
    const [errors, setErrors] = useState({});

    const { data: asalData, isLoading: isAsalLoading, isError: isAsalError } = useSeeAllAsalQuery();
    const asalList = asalData?.data || [];

    const selectedProvinsi = asalList.find((p) => p.id === provinsiId);
    const kabupatenOptions = selectedProvinsi?.kabupaten || [];
    const selectedKabupaten = kabupatenOptions.find((k) => k.id === kabupatenId);

    const [createKandidat, { data, isLoading, isError }] = useCreateKandidatMutation();
    const kode = data?.data ?? {};
    const [showSuccess, setShowSuccess] = useState(null);

    const clearError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const validateStep = (targetStep) => {
        const stepErrors = {};

        if (targetStep === 1) {
            if (!nama.trim()) stepErrors.nama = "Nama lengkap wajib diisi";
            if (tinggiBadan === "" || Number(tinggiBadan) <= 0) stepErrors.tinggiBadan = "Tinggi badan wajib diisi";
            if (berat_badan === "" || Number(berat_badan) <= 0) stepErrors.berat_badan = "Berat badan wajib diisi";
            if (!tgllahir) stepErrors.tgllahir = "Tanggal lahir wajib diisi";
            if (!provinsiId) stepErrors.provinsiId = "Provinsi wajib dipilih";
            if (!kabupatenId) stepErrors.kabupatenId = "Kabupaten/Kota wajib dipilih";
            if (!telephone) stepErrors.telephone = "Nomor telephone wajib diisi";
            if (!dana) stepErrors.dana = "Status pembiayaan wajib dipilih";
            if (!agama) stepErrors.agama = "Agama wajib dipilih";
            if (!pernikahan) stepErrors.pernikahan = "Status perkawinan wajib dipilih";
            if (!tempatLahir) stepErrors.tempatLahir = "Tempat lahir wajib diisi";
        }

        if (targetStep === 2) {
            if (!tujuan) stepErrors.tujuan = "Negara tujuan wajib dipilih";
            if (tujuan === "Lainnya" && !tujuanLainnya.trim()) stepErrors.tujuanLainnya = "Nama negara tujuan wajib diisi";
            if (!pendidikan) stepErrors.pendidikan = "Pendidikan terakhir wajib dipilih";
        }

        if (targetStep === 3) {
            if (!cv) stepErrors.cv = "CV / Resume wajib diunggah";
            if (!ktp) stepErrors.ktp = "KTP wajib diunggah";
            if (!ktpPendamping) stepErrors.ktpPendamping = "KTP Pendamping wajib diunggah";
            if (!kk) stepErrors.kk = "Kartu Keluarga (KK) wajib diunggah";
            if (!ijazah) stepErrors.ijazah = "Ijazah wajib diunggah";
        }

        return stepErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi ulang seluruh step sebelum benar-benar mengirim,
        // supaya tidak ada field yang lolos meski user sempat kembali/ubah data.
        const allErrors = {
            ...validateStep(1),
            ...validateStep(2),
            ...validateStep(3),
        };

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);

            const step1Fields = [
                "nama",
                "tinggiBadan",
                "berat_badan",
                "tgllahir",
                "provinsiId",
                "kabupatenId",
                "telephone",
                "telephone_sekunder",
                "dana",
                "agama",
                "pernikahan",
                "tempatLahir",
            ];
            const step2Fields = ["tujuan", "tujuanLainnya", "pendidikan"];

            if (step1Fields.some((f) => allErrors[f])) setStep(1);
            else if (step2Fields.some((f) => allErrors[f])) setStep(2);
            else setStep(3);

            return;
        }

        const formData = new FormData();
        // field biasa
        formData.append("nama", nama);
        formData.append("tinggi", tinggiBadan);
        formData.append("berat_badan", berat_badan);
        formData.append("tgllahir", tgllahir);
        formData.append("tujuan", tujuan === "Lainnya" ? tujuanLainnya : tujuan);
        formData.append("pendidikan", pendidikan);
        formData.append("provinsiId", provinsiId);
        formData.append("kabupatenId", kabupatenId);
        formData.append("bidang_pekerjaan", bidang_pekerjaan);
        formData.append("telephone", telephone);
        formData.append("telephone_sekunder", telephone_sekunder);
        formData.append("dana", dana);
        formData.append("agama", agama);
        formData.append("pernikahan", pernikahan);
        formData.append("tempatLahir", tempatLahir);

        // gambar
        formData.append("cv", cv);
        formData.append("kk", kk);
        formData.append("ktp", ktp);
        formData.append("ktp_pendamping", ktpPendamping);
        formData.append("ijazah", ijazah);
        if (sertifikat) {
            formData.append("sertifikat", sertifikat);
        }

        try {
            await createKandidat({
                data: formData,
            }).unwrap();

            setShowSuccess(true);
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    const isNegaraLainnya = tujuan === "Lainnya";
    const negaraTujuanFinal = isNegaraLainnya ? tujuanLainnya : tujuan;

    const goNext = (e) => {
        e?.preventDefault();

        const stepErrors = validateStep(step);
        setErrors(stepErrors);

        if (Object.keys(stepErrors).length > 0) return;

        setStep((s) => Math.min(s + 1, STEPS.length));
    };

    const goBack = () => setStep((s) => Math.max(s - 1, 1));

    const handleFileChange = (setter, field) => (e) => {
        const file = e.target.files?.[0] || null;
        setter(file);
        if (file) clearError(field);
    };

    const handleProvinsiChange = (e) => {
        const value = e.target.value;
        setProvinsiId(value);
        setKabupatenId(""); // reset kabupaten setiap ganti provinsi
        clearError("provinsiId");
    };

    const handleKabupatenChange = (e) => {
        const value = e.target.value;
        setKabupatenId(value);
        clearError("kabupatenId");
    };

    const borderClass = (field) => (errors[field] ? "border-rose-400" : "border-slate-300 focus:border-[#16223B]");

    if (showSuccess) {
        return (
            <div className="px-6 sm:px-8 py-12 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center">
                        <CircleCheck className="w-12 h-12 text-emerald-500" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-slate-800">Pendaftaran Berhasil</h2>

                <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                    Data pendaftaran berhasil dikirim dan akan diverifikasi oleh panitia. Silakan simpan kode registrasi berikut untuk keperluan pengecekan data.
                </p>

                {/* Kode Registrasi */}
                <div className="mt-6 max-w-sm mx-auto">
                    <div className="rounded-xl border border-[#D9B25C]/40 bg-[#D9B25C]/10 px-6 py-5">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Kode Registrasi</p>

                        <p className="mt-2 text-3xl font-bold tracking-[0.2em] text-[#16223B]">{kode?.kodeRegistrasi}</p>

                        <p className="mt-2 text-xs text-slate-400">Simpan kode ini untuk pengecekan status pendaftaran.</p>

                        {/* Tombol Cek Status */}
                        <Link
                            href="/verifikasi"
                            className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#16223B] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1e2d4d] hover:shadow-md active:scale-[0.98]"
                        >
                            Cek Status Pendaftaran
                        </Link>
                    </div>
                </div>

                {/* Informasi */}
                <div className="mt-6 max-w-md mx-auto rounded-lg bg-slate-50 border border-slate-200 px-4 py-3">
                    <p className="text-xs text-slate-500 leading-relaxed">Mohon hubungi admin apabila data pendaftaran sudah diinput atau terdapat perubahan pada data.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit} className="px-6 sm:px-8 py-7" noValidate>
                {step === 1 && (
                    <div className="space-y-5">
                        <div>
                            <h2 className="font-swiss text-lg font-semibold text-slate-800">Data Diri</h2>
                            <p className="text-[13px] text-slate-400">Isikan data sesuai dokumen identitas.</p>
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                Nama Lengkap<span className="text-rose-600 ml-1">*</span>
                            </label>
                            <input
                                className={inputClass + " " + borderClass("nama")}
                                maxLength={100}
                                type="text"
                                placeholder="Nama Lengkap"
                                value={nama}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Hanya huruf dan spasi
                                    if (/^[A-Za-z ]*$/.test(value)) {
                                        setNama(value);
                                        clearError("nama");
                                    }
                                }}
                            />
                            <FieldError message={errors.nama} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Tinggi Badan (cm)<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <input
                                    className={inputClass + " " + borderClass("tinggiBadan")}
                                    maxLength={3}
                                    type="number"
                                    step="0.1"
                                    placeholder="170"
                                    value={tinggiBadan}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 3) {
                                            setTinggiBadan(value);
                                            clearError("tinggiBadan");
                                        }
                                    }}
                                />
                                <FieldError message={errors.tinggiBadan} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Berat Badan (kg)<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <input
                                    className={inputClass + " " + borderClass("berat_badan")}
                                    maxLength={3}
                                    type="number"
                                    step="0.1"
                                    placeholder="65"
                                    value={berat_badan}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 3) {
                                            setBerat_badan(value);
                                            clearError("berat_badan");
                                        }
                                    }}
                                />
                                <FieldError message={errors.berat_badan} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Agama<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select
                                    value={agama}
                                    onChange={(e) => {
                                        setAgama(e.target.value);
                                        clearError("agama");
                                    }}
                                    className={inputClass + " " + borderClass("agama")}
                                >
                                    <option value="">-- Pilih Agama --</option>
                                    <option value="ISLAM">Islam</option>
                                    <option value="KRISTEN">Kristen</option>
                                    <option value="KATOLIK">Katolik</option>
                                    <option value="HINDU">Hindu</option>
                                    <option value="BUDHA">Buddha</option>
                                    <option value="KONGHUCU">Konghucu</option>
                                </select>
                                <FieldError message={errors.agama} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Status Pernikahan<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select
                                    value={pernikahan}
                                    onChange={(e) => {
                                        setPernikahan(e.target.value);
                                        clearError("pernikahan");
                                    }}
                                    className={inputClass + " " + borderClass("pernikahan")}
                                >
                                    <option value="">-- Pilih Status Pernikahan --</option>
                                    <option value="BELUM">Belum Menikah</option>
                                    <option value="MENIKAH">Menikah</option>
                                    <option value="CERAI_HIDUP">Cerai Hidup</option>
                                    <option value="CERAI_MATI">Cerai Mati</option>
                                </select>
                                <FieldError message={errors.pernikahan} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                Tempat Lahir<span className="text-rose-600 ml-1">*</span>
                            </label>
                            <input
                                className={inputClass + " " + borderClass("tempatLahir")}
                                maxLength={100}
                                type="text"
                                placeholder="Tempat Lahir"
                                value={tempatLahir}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // Hanya huruf dan spasi
                                    if (/^[A-Za-z ]*$/.test(value)) {
                                        setTempatLahir(value);
                                        clearError("tempatLahir");
                                    }
                                }}
                            />
                            <FieldError message={errors.tempatLahir} />
                        </div>

                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Tanggal Lahir
                                    <span className="text-rose-600 ml-1">*</span>
                                </label>

                                <input
                                    className={inputClass + " " + borderClass("tgllahir")}
                                    type="date"
                                    value={tgllahir}
                                    onChange={(e) => {
                                        setTgllahir(e.target.value);
                                        clearError("tgllahir");
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Umur</label>

                                <input
                                    className={inputClass + " bg-slate-100 cursor-not-allowed"}
                                    type="text"
                                    value={tgllahir ? `${calculateAge(tgllahir)} Tahun` : ""}
                                    readOnly
                                    placeholder="Otomatis"
                                />
                            </div>

                            <FieldError message={errors.tgllahir} />
                        </dl>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Provinsi<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select className={inputClass + " " + borderClass("provinsiId")} value={provinsiId} onChange={handleProvinsiChange} disabled={isAsalLoading}>
                                    <option value="">{isAsalLoading ? "Memuat provinsi..." : "-- Pilih Provinsi --"}</option>
                                    {asalList.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.namaProvinsi}
                                        </option>
                                    ))}
                                </select>
                                {isAsalError && <p className="text-[11px] text-rose-600 mt-1">Gagal memuat data provinsi.</p>}
                                <FieldError message={errors.provinsiId} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Kabupaten/Kota<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select className={inputClass + " " + borderClass("kabupatenId")} value={kabupatenId} onChange={handleKabupatenChange} disabled={!provinsiId}>
                                    <option value="">{provinsiId ? "-- Pilih Kabupaten/Kota --" : "Pilih provinsi terlebih dahulu"}</option>
                                    {kabupatenOptions.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {k.namaKabupaten}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.kabupatenId} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Nomor Telephone<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <input
                                    className={inputClass + " " + borderClass("telephone")}
                                    maxLength={12}
                                    placeholder="0812345678"
                                    type="number"
                                    value={telephone}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 12) {
                                            setTelephone(value);
                                            clearError("telephone");
                                        }
                                    }}
                                />
                                <FieldError message={errors.telephone} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Nomor Telephone 2 <span className="text-gray-600 font-light italic"> Opsional</span>
                                </label>
                                <input
                                    className={inputClass + " " + borderClass("telephone_sekunder")}
                                    maxLength={12}
                                    placeholder="0812345678"
                                    type="number"
                                    value={telephone_sekunder}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.length <= 12) {
                                            setTelephone_sekunder(value);
                                            clearError("telephone_sekunder");
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Pembiayaan<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select
                                    value={dana}
                                    onChange={(e) => {
                                        setDana(e.target.value);
                                        clearError("dana");
                                    }}
                                    className={inputClass + " " + borderClass("dana")}
                                >
                                    <option value="">-- Pilih Status --</option>
                                    <option value="MANDIRI">Mandiri</option>
                                    <option value="TALANG">Talang</option>
                                </select>
                                <FieldError message={errors.dana} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5">
                        <div>
                            <h2 className="font-swiss text-lg font-semibold text-slate-800">Akademik & Tujuan</h2>
                            <p className="text-[13px] text-slate-400">Informasi latar belakang pendidikan dan program yang dituju.</p>
                        </div>

                        <div>
                            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                Negara Tujuan<span className="text-rose-600 ml-1">*</span>
                            </label>

                            <select
                                className={inputClass + " " + borderClass("tujuan")}
                                value={tujuan}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setTujuan(value);
                                    clearError("tujuan");

                                    if (value !== "Lainnya") {
                                        setTujuanLainnya("");
                                        clearError("tujuanLainnya");
                                    }
                                }}
                            >
                                <option value="">-- Pilih Negara --</option>

                                {NEGARA_OPTIONS.map((n) => (
                                    <option key={n} value={n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                            <FieldError message={errors.tujuan} />

                            {isNegaraLainnya && (
                                <>
                                    <input
                                        className={inputClass + " " + borderClass("tujuanLainnya") + " mt-2.5"}
                                        type="text"
                                        placeholder="Tuliskan nama negara tujuan"
                                        value={tujuanLainnya}
                                        onChange={(e) => {
                                            setTujuanLainnya(e.target.value);
                                            clearError("tujuanLainnya");
                                        }}
                                    />
                                    <FieldError message={errors.tujuanLainnya} />
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                                    Pendidikan Terakhir<span className="text-rose-600 ml-1">*</span>
                                </label>
                                <select
                                    className={inputClass + " " + borderClass("pendidikan")}
                                    value={pendidikan}
                                    onChange={(e) => {
                                        setPendidikan(e.target.value);
                                        clearError("pendidikan");
                                    }}
                                >
                                    <option value="">-- Pilih --</option>
                                    {PENDIDIKAN_OPTIONS.map((p) => (
                                        <option key={p} value={p}>
                                            {p}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={errors.pendidikan} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Posisi yang diinginkan</label>
                                <input
                                    className={inputClass + " border-slate-300 focus:border-[#16223B]"}
                                    type="text"
                                    placeholder="Contoh: IT, Pendidikan, Kesehatan"
                                    value={bidang_pekerjaan}
                                    onChange={(e) => setBidang_pekerjaan(e.target.value)}
                                />
                                <p className="text-[11px] text-slate-400 mt-1">Opsional</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-5">
                        <div>
                            <h2 className="font-swiss text-lg font-semibold text-slate-800">Berkas Dokumen</h2>
                            <p className="text-[13px] text-slate-400">Unggah berkas persyaratan berikut. Berkas bertanda * wajib dilampirkan.</p>
                        </div>

                        <ul className="divide-y divide-slate-100 border border-slate-200 rounded-md overflow-hidden">
                            {/* CV / Resume */}
                            <li className={uploadRowClass + (errors.cv ? " bg-rose-50/60" : "")}>
                                {cv ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                    <Circle className={"w-5 h-5 shrink-0 " + (errors.cv ? "text-rose-400" : "text-slate-300")} />
                                )}
                                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        CV / Resume<span className="text-rose-600 ml-1">*</span>
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">{cv?.name || "PDF, DOC, DOCX — maks. 5MB"}</p>
                                    <FieldError message={errors.cv} />
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {cv ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange(setCv, "cv")} />
                                </label>
                            </li>

                            {/* KTP */}
                            <li className={uploadRowClass + (errors.ktp ? " bg-rose-50/60" : "")}>
                                {ktp ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                    <Circle className={"w-5 h-5 shrink-0 " + (errors.ktp ? "text-rose-400" : "text-slate-300")} />
                                )}
                                <IdCard className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        KTP<span className="text-rose-600 ml-1">*</span>
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">{ktp?.name || "JPG, PNG, JPEG — maks. 5MB"}</p>
                                    <FieldError message={errors.ktp} />
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {ktp ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange(setKtp, "ktp")} />
                                </label>
                            </li>

                            {/* KTP Pendamping */}
                            <li className={uploadRowClass}>
                                {ktpPendamping ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                    <Circle className={"w-5 h-5 shrink-0 " + (errors.ktpPendamping ? "text-rose-400" : "text-slate-300")} />
                                )}
                                <IdCard className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        KTP Pendamping<span className="text-rose-600 ml-1">*</span>
                                    </p>

                                    <p className="text-[11px] text-slate-400 truncate">{ktpPendamping?.name || "JPG, PNG, JPEG — maks. 5MB (opsional)"}</p>
                                    <FieldError message={errors.ktpPendamping} />
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {ktpPendamping ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange(setKtpPendamping, "ktpPendamping")} />
                                </label>
                            </li>

                            {/* Kartu Keluarga */}
                            <li className={uploadRowClass + (errors.kk ? " bg-rose-50/60" : "")}>
                                {kk ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                    <Circle className={"w-5 h-5 shrink-0 " + (errors.kk ? "text-rose-400" : "text-slate-300")} />
                                )}
                                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        Kartu Keluarga (KK)<span className="text-rose-600 ml-1">*</span>
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">{kk?.name || "JPG, PNG, JPEG — maks. 5MB"}</p>
                                    <FieldError message={errors.kk} />
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {kk ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange(setKK, "kk")} />
                                </label>
                            </li>

                            {/* Ijazah */}
                            <li className={uploadRowClass + (errors.ijazah ? " bg-rose-50/60" : "")}>
                                {ijazah ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                ) : (
                                    <Circle className={"w-5 h-5 shrink-0 " + (errors.ijazah ? "text-rose-400" : "text-slate-300")} />
                                )}
                                <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">
                                        Ijazah<span className="text-rose-600 ml-1">*</span>
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">{ijazah?.name || "JPG, PNG, JPEG — maks. 5MB"}</p>
                                    <FieldError message={errors.ijazah} />
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {ijazah ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange(setIjazah, "ijazah")} />
                                </label>
                            </li>

                            {/* Sertifikat */}
                            <li className={uploadRowClass}>
                                {sertifikat ? <CircleCheck className="w-5 h-5 text-emerald-600 shrink-0" /> : <Circle className="w-5 h-5 text-slate-300 shrink-0" />}
                                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-slate-700">Sertifikat</p>
                                    <p className="text-[11px] text-slate-400 truncate">{sertifikat?.name || "PDF, DOC, DOCX — maks. 5MB (opsional)"}</p>
                                </div>
                                <label className={uploadButtonClass}>
                                    <UploadCloud className="w-3.5 h-3.5" />
                                    {sertifikat ? "Ganti" : "Pilih"}
                                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange(setSertifikat, "sertifikat")} />
                                </label>
                            </li>
                        </ul>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-swiss text-lg font-semibold text-slate-800">Tinjau & Kirim</h2>
                            <p className="text-[13px] text-slate-400">Periksa kembali data Anda sebelum mengirim pendaftaran.</p>
                        </div>

                        <div className="border border-slate-200 rounded-md divide-y divide-slate-100">
                            {/* Data Diri */}
                            <div className="px-4 sm:px-5 py-4">
                                <div className="flex items-center justify-between mb-2.5">
                                    <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">Data Diri</h3>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[#16223B] hover:underline underline-offset-4"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        Ubah
                                    </button>
                                </div>
                                <dl className="space-y-1.5">
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Nama Lengkap</dt>
                                        <dd className="text-right font-medium text-slate-700">{nama || "—"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Tinggi / Berat Badan</dt>
                                        <dd className="text-right font-medium text-slate-700">
                                            {tinggiBadan || "—"} cm · {berat_badan || "—"} kg
                                        </dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Asal Daerah</dt>
                                        <dd className="text-right font-medium text-slate-700">
                                            {selectedKabupaten?.namaKabupaten && selectedProvinsi?.namaProvinsi
                                                ? `${selectedKabupaten.namaKabupaten}, ${selectedProvinsi.namaProvinsi}`
                                                : "—"}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Akademik & Tujuan */}
                            <div className="px-4 sm:px-5 py-4">
                                <div className="flex items-center justify-between mb-2.5">
                                    <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">Akademik & Tujuan</h3>
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[#16223B] hover:underline underline-offset-4"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        Ubah
                                    </button>
                                </div>
                                <dl className="space-y-1.5">
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Negara Tujuan</dt>
                                        <dd className="text-right font-medium text-slate-700">{negaraTujuanFinal || "—"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Pendidikan Terakhir</dt>
                                        <dd className="text-right font-medium text-slate-700">{pendidikan || "—"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Posisi yang diinginkan</dt>
                                        <dd className="text-right font-medium text-slate-700">{bidang_pekerjaan || "—"}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Berkas Dokumen */}
                            <div className="px-4 sm:px-5 py-4">
                                <div className="flex items-center justify-between mb-2.5">
                                    <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">Berkas Dokumen</h3>
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-[#16223B] hover:underline underline-offset-4"
                                    >
                                        <Pencil className="w-3 h-3" />
                                        Ubah
                                    </button>
                                </div>
                                <dl className="space-y-1.5">
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">CV / Resume</dt>
                                        <dd className={"text-right font-medium " + (!cv ? "text-rose-600" : "text-slate-700")}>{cv?.name || "Belum diunggah"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">KTP</dt>
                                        <dd className={"text-right font-medium " + (!ktp ? "text-rose-600" : "text-slate-700")}>{ktp?.name || "Belum diunggah"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">KTP Pendamping</dt>
                                        <dd className="text-right font-medium text-slate-700">{ktpPendamping?.name || "Tidak dilampirkan"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Kartu Keluarga (KK)</dt>
                                        <dd className={"text-right font-medium " + (!kk ? "text-rose-600" : "text-slate-700")}>{kk?.name || "Belum diunggah"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Ijazah</dt>
                                        <dd className={"text-right font-medium " + (!ijazah ? "text-rose-600" : "text-slate-700")}>{ijazah?.name || "Belum diunggah"}</dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 text-sm">
                                        <dt className="text-slate-400">Sertifikat</dt>
                                        <dd className="text-right font-medium text-slate-700">{sertifikat?.name || "Tidak dilampirkan"}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {Object.keys(errors).length > 0 && (
                            <p className="flex items-center gap-1.5 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-3.5 py-2.5">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                Masih ada data/berkas yang wajib diisi. Silakan periksa kembali.
                            </p>
                        )}
                    </div>
                )}

                {/* Navigasi */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={goBack}
                        className={
                            "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors " +
                            (step === 1 ? "invisible" : "text-slate-600 hover:bg-slate-50")
                        }
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    {step < STEPS.length ? (
                        <button
                            type="button"
                            onClick={(e) => goNext(e)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                        >
                            Lanjutkan
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#B8862E] text-white text-sm font-semibold hover:bg-[#a3761f] transition-colors"
                            disabled={isLoading}
                        >
                            <Send className="w-4 h-4" />
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isLoading ? "Menyimpan..." : "Kirim Pendaftaran"}
                        </button>
                    )}
                </div>
            </form>
        </>
    );
}
