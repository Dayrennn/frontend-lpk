'use client';

import { useState } from 'react';
import { ArrowLeft, Save, User, FileText, GraduationCap, Image as ImageIcon, Upload, IdCard } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useModifyKandidatMutation, useSeeOneKandidatQuery } from '@/hooks/api/kandidatSliceAPI';
import DataDiri from '@/app/components/kandidat/DataDiri';
import Akademik from '@/app/components/kandidat/Akademik';
import DokumenKandidat from '@/app/components/kandidat/Dokumen';
import InformasiKandidat from '@/app/components/kandidat/infoKandidat';
import ModalSukses from '@/app/components/modal/suksesModal';
import DocumentPreview from '@/app/components/preview/documentPreview';

function Section({ icon: Icon, title, children }) {
    return (
        <section className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-slate-50/70">
                <Icon className="w-4 h-4 text-[#16223B]" />

                <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
            </div>

            <div className="p-5">{children}</div>
        </section>
    );
}

export default function EditKandidatPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useSeeOneKandidatQuery(id);
    const kandidatList = data?.data ?? {};
    const [updateKandidat, { isLoading: updateLoading, isError: errorUpdate }] = useModifyKandidatMutation(id);

    const [showSuccess, setShowSuccess] = useState(false);
    const [dokumenBaru, setDokumenBaru] = useState({});

    const [nama, setNama] = useState('');
    const [tinggiBadan, setTinggiBadan] = useState('');
    const [berat_badan, setBerat_badan] = useState('');
    const [umur, setUmur] = useState('');
    const [tgllahir, setTgllahir] = useState('');
    const [asal, setAsal] = useState('');
    const [telephone, setTelephone] = useState('');
    const [tujuan, setTujuan] = useState('');
    const [pendidikan, setPendidikan] = useState('');
    const [bidang_pekerjaan, setBidang_pekerjaan] = useState('');
    const [dana, setDana] = useState('');
    const [status, setStatus] = useState('');
    const [ojk, setOjk] = useState('');
    const [pic, setPic] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [kabupatenId, setKabupatenId] = useState('');
    const [provinsiId, setProvinsiId] = useState('');

    const [cvFile, setCvFile] = useState(null);
    const [kkFile, setKkFile] = useState(null);
    const [ktpFile, setKtpFile] = useState(null);
    const [ktpPendampingFile, setKtpPendampingFile] = useState(null);
    const [ijazahFile, setIjazahFile] = useState(null);
    const [sertifikatFile, setSertifikatFile] = useState(null);

    if (isLoading) {
        return <div className="p-8 text-center text-slate-400">Memuat data...</div>;
    }
    if (isError || !kandidatList) {
        return <div className="p-8 text-center text-red-500">Gagal memuat data kandidat.</div>;
    }

    const handleFilesChange = (key, file) => {
        setDokumenBaru((prev) => ({ ...prev, [key]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // field biasa
        if (nama) {
            formData.append('nama', nama);
        }
        if (tinggiBadan) {
            formData.append('tinggi', tinggiBadan);
        }
        if (berat_badan) {
            formData.append('berat_badan', berat_badan);
        }
        if (umur) {
            formData.append('umur', umur);
        }
        if (tgllahir) {
            formData.append('tgglahir', tgllahir);
        }
        if (tujuan) {
            formData.append('tujuan', tujuan === 'Lainnya' ? tujuanLainnya : tujuan);
        }
        if (pendidikan) {
            formData.append('pendidikan', pendidikan);
        }
        if (asal) {
            formData.append('asal', asal);
        }
        if (bidang_pekerjaan) {
            formData.append('bidang_pekerjaan', bidang_pekerjaan);
        }
        if (telephone) {
            formData.append('telephone', telephone);
        }
        if (dana) {
            formData.append('dana', dana);
        }
        if (status) {
            formData.append('status', status);
        }
        if (ojk) {
            formData.append('ojk', ojk);
        }
        if (pic) {
            formData.append('pic', pic);
        }
        if (keterangan) {
            formData.append('keterangan', keterangan);
        }
        if (kabupatenId) {
            formData.append('kabupatenId', kabupatenId);
        }
        if (provinsiId) {
            formData.append('provinsiId', provinsiId);
        }

        if (dokumenBaru.cv) {
            formData.append('cv', dokumenBaru.cv);
        }
        if (dokumenBaru.kk) {
            formData.append('kk', dokumenBaru.kk);
        }
        if (dokumenBaru.ktp) {
            formData.append('ktp', dokumenBaru.ktp);
        }
        if (dokumenBaru.ktp_pendamping) {
            formData.append('ktp_pendamping', dokumenBaru.ktp_pendamping);
        }
        if (dokumenBaru.ijazah) {
            formData.append('ijazah', dokumenBaru.ijazah);
        }
        if (dokumenBaru.sertifikat) {
            formData.append('sertifikat', dokumenBaru.sertifikat);
        }

        try {
            await updateKandidat({
                id,
                data: formData,
            }).unwrap();
            setShowSuccess(true);
        } catch (err) {
            console.error('ERROR', err);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#EEF0F4]">
                {/* Header */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#16223B] mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </button>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-semibold text-slate-800">Edit Kandidat</h1>

                                <p className="text-sm text-slate-400 mt-1">
                                    Perbarui data kandidat dan periksa kembali dokumen yang tersedia.
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span
                                    className={
                                        'px-2.5 py-1 rounded-full text-xs font-semibold ' +
                                        (status === 'DRAFT'
                                            ? 'bg-amber-50 text-amber-700'
                                            : 'bg-emerald-50 text-emerald-700')
                                    }
                                >
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="max-w-6xl mx-auto px-5 sm:px-8 py-7">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                {/* DATA DIRI */}
                                <Section icon={User} title="Data Diri">
                                    <DataDiri
                                        nama={nama || kandidatList.nama || ''}
                                        setNama={setNama}
                                        tinggiBadan={tinggiBadan || kandidatList.tinggi || ''}
                                        setTinggiBadan={setTinggiBadan}
                                        berat_badan={berat_badan || kandidatList.berat_badan || ''}
                                        setBerat_badan={setBerat_badan}
                                        umur={umur || kandidatList.umur || ''}
                                        setUmur={setUmur}
                                        tgllahir={
                                            tgllahir ||
                                            (kandidatList.tgllahir ? kandidatList.tgllahir.split('T')[0] : '')
                                        }
                                        setTgllahir={setTgllahir}
                                        kabupatenId={kabupatenId || kandidatList.kabupaten?.id || ''}
                                        setKabupatenId={setKabupatenId}
                                        provinsiId={provinsiId || kandidatList.provinsi?.id || ''}
                                        setProvinsiId={setProvinsiId}
                                        telephone={telephone || kandidatList.telephone || ''}
                                        setTelephone={setTelephone}
                                    />
                                </Section>

                                {/* AKADEMIK */}
                                <Section icon={GraduationCap} title="Akademik & Tujuan">
                                    <Akademik
                                        tujuan={tujuan || kandidatList.tujuan || ''}
                                        setTujuan={setTujuan}
                                        pendidikan={pendidikan || kandidatList.pendidikan || ''}
                                        setPendidikan={setPendidikan}
                                        bidang_pekerjaan={bidang_pekerjaan || kandidatList.bidang_pekerjaan || ''}
                                        setBidang_pekerjaan={setBidang_pekerjaan}
                                        dana={dana || kandidatList.dana || ''}
                                        setDana={setDana}
                                        status={status || kandidatList.status || ''}
                                        setStatus={setStatus}
                                        ojk={ojk || kandidatList.ojk || ''}
                                        setOjk={setOjk}
                                        pic={pic || kandidatList.pic || ''}
                                        setPic={setPic}
                                        keterangan={keterangan || kandidatList.keterangan || ''}
                                        setKeterangan={setKeterangan}
                                    />
                                </Section>

                                {/* DOKUMEN */}
                                <Section icon={FileText} title="Dokumen Kandidat">
                                    <DokumenKandidat
                                        dataKandidat={kandidatList}
                                        onFilesChange={handleFilesChange}
                                        cvFile={cvFile}
                                        setCvFile={setCvFile}
                                        kkFile={kkFile}
                                        setKkfile={setKkFile}
                                        ktpFile={ktpFile}
                                        setKtpFile={setKtpFile}
                                        ktpPendampingFile={ktpPendampingFile}
                                        setKtpPendampingFile={setKtpPendampingFile}
                                        ijazahFile={ijazahFile}
                                        setIjazahFile={setIjazahFile}
                                        sertifikatFile={sertifikatFile}
                                        setSertifikatFile={setSertifikatFile}
                                    />
                                </Section>
                            </div>

                            <div className="space-y-6">
                                {/* INFO KANDIDAT */}
                                <div className="bg-white border border-slate-200 rounded-lg p-5">
                                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Informasi Kandidat</h2>

                                    <InformasiKandidat dataKandidat={kandidatList} />
                                </div>

                                {/* PREVIEW IMAGE UTAMA */}
                                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                    <div className="px-5 py-4 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-[#16223B]" />

                                            <h2 className="text-sm font-semibold text-slate-800">Preview KTP</h2>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-100">
                                        <DocumentPreview
                                            title="KTP"
                                            icon={IdCard}
                                            url={ktpFile ? URL.createObjectURL(ktpFile) : kandidatList.ktpUrl}
                                            type="image"
                                        />
                                        <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                                            <Upload className="w-3.5 h-3.5" />
                                            {ktpFile ? `Ganti file (${ktpFile.name})` : 'Upload KTP baru'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    setKtpFile(file);
                                                    handleFilesChange('ktp', file); 
                                                }}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* SAVE */}
                                <div className="bg-white border border-slate-200 rounded-lg p-5 sticky top-5">
                                    <h2 className="text-sm font-semibold text-slate-800">Simpan Perubahan</h2>

                                    <p className="text-xs text-slate-400 mt-1 mb-4">
                                        Pastikan seluruh data sudah benar sebelum menyimpan.
                                    </p>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
            {/* {showSuccess && (<ModalSukses onClose={() => setShowModal(false)} />)} */}
            {showSuccess && <ModalSukses onClose={() => router.push('/data-kandidat')} />}
        </>
    );
}
