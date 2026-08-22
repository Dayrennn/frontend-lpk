'use client';

import DocumentPreview from '../preview/documentPreview';
import { FileText, Users, IdCard, GraduationCap, Award, Upload } from 'lucide-react';

export default function DokumenKandidat({
    dataKandidat,
    onFilesChange,
    cvFile,
    setCvFile,
    kkFile,
    setKkfile,
    ktpPendampingFile,
    setKtpPendampingFile,
    ijazahFile,
    setIjazahFile,
    sertifikatFile,
    setSertifikatFile,
}) {
    const handleChange = (setter, key) => (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setter(file);
        onFilesChange?.(key, file);
    };

    return (
        <div className="space-y-5">
            {/* CV */}
            <div className="space-y-2">
                <DocumentPreview
                    title="CV / Resume"
                    icon={FileText}
                    url={cvFile ? URL.createObjectURL(cvFile) : dataKandidat.cvUrl}
                    type="pdf"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    {cvFile ? `Ganti file (${cvFile.name})` : 'Upload CV baru'}
                    <input type="file" accept=".pdf" className="hidden" onChange={handleChange(setCvFile, 'cv')} />
                </label>
            </div>

            {/* KK */}
            <div className="space-y-2">
                <DocumentPreview
                    title="Kartu Keluarga (KK)"
                    icon={Users}
                    url={kkFile ? URL.createObjectURL(kkFile) : dataKandidat.kkUrl}
                    type="image"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    {kkFile ? `Ganti file (${kkFile.name})` : 'Upload KK baru'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleChange(setKkfile, 'kk')} />
                </label>
            </div>

            {/* KTP Pendamping */}
            <div className="space-y-2">
                <DocumentPreview
                    title="KTP Pendamping"
                    icon={IdCard}
                    url={ktpPendampingFile ? URL.createObjectURL(ktpPendampingFile) : dataKandidat.ktp_pendampingUrl}
                    type="image"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    {ktpPendampingFile ? `Ganti file (${ktpPendampingFile.name})` : 'Upload KTP Pendamping baru'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange(setKtpPendampingFile, 'ktp_pendamping')}
                    />
                </label>
            </div>

            {/* Ijazah */}
            <div className="space-y-2">
                <DocumentPreview
                    title="Ijazah"
                    icon={GraduationCap}
                    url={ijazahFile ? URL.createObjectURL(ijazahFile) : dataKandidat.ijazahUrl}
                    type="image"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    {ijazahFile ? `Ganti file (${ijazahFile.name})` : 'Upload Ijazah baru'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange(setIjazahFile, 'ijazah')}
                    />
                </label>
            </div>

            {/* Sertifikat */}
            <div className="space-y-2">
                <DocumentPreview
                    title="Sertifikat"
                    icon={Award}
                    url={sertifikatFile ? URL.createObjectURL(sertifikatFile) : dataKandidat.sertifikatUrl}
                    type="image"
                />
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                    <Upload className="w-3.5 h-3.5" />
                    {sertifikatFile ? `Ganti file (${sertifikatFile.name})` : 'Upload Sertifikat baru'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange(setSertifikatFile, 'sertifikat')}
                    />
                </label>
            </div>
        </div>
    );
}
