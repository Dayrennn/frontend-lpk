"use client";

import { useParams, useRouter } from "next/navigation";
import { useSeeOneCPMIQuery, useInputDataCPMIMutation } from "@/hooks/api/kandidatSliceAPI";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import EditCPMI from "@/app/components/cpmi/editCPMI";
import ModalSukses from "@/app/components/modal/suksesModal";
import { formatDateForInput } from "@/hooks/helper/formatTanggal";
export default function EditCPMIPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data, isLoading, isError } = useSeeOneCPMIQuery(id);
    const cpmi = data?.data ?? {};

    const [input, { isLoading: loadingInput }] = useInputDataCPMIMutation(id);

    const [showSuccess, setShowSuccess] = useState(false);
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [telephone, setTelephone] = useState("");
    const [telephone_sekunder, setTelephone_sekunder] = useState("");
    const [namaOrtu, setNamaortu] = useState("");
    const [telephoneOrtu, setTelephoneOrtu] = useState("");
    const [namaKerabat, setNamaKerabat] = useState("");
    const [telephoneKerabat, setTelephoneKerabat] = useState("");
    const [job, setJob] = useState("");
    const [tanggalTerima, setTanggalTerima] = useState("");
    const [tanggalBerangkat, setTanggalBerangkat] = useState("");
    const [perusahaanPenempatan, setPerusahaanPenempatan] = useState("");
    const [kontrak, setKontrak] = useState("");
    const [tempatPelatihan, setTempatPelatihan] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {};
        if (nama) payload.nama = nama;
        if (alamat) payload.alamatSesuaiKTP = alamat;
        if (telephone) payload.telephone = telephone;
        if (telephone_sekunder) payload.telephone_sekunder = telephone_sekunder;
        if (namaOrtu) payload.namaOrangTua = namaOrtu;
        if (telephoneOrtu) payload.telephoneOrtu = telephoneOrtu;
        if (namaKerabat) payload.namaKerabat = namaKerabat;
        if (telephoneKerabat) payload.telephoneKerabat = telephoneKerabat;
        if (job) payload.job = job;
        if (tanggalTerima) payload.tanggalTerima = tanggalTerima;
        if (tanggalBerangkat) payload.tanggalBerangkat = tanggalBerangkat;
        if (perusahaanPenempatan) payload.perusahaanPenempatan = perusahaanPenempatan;
        if (kontrak) payload.kontrak = kontrak;
        if (tempatPelatihan) payload.tempatPelatihan = tempatPelatihan;

        try {
            await input({ id, data: payload }).unwrap();
            setShowSuccess(true);
        } catch (err) {
            console.error("ERROR", err);
        }
    };

    return (
        <>
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5">
                    <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#16223B] mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-slate-800">Edit CPMI</h1>

                            <p className="text-sm text-slate-400 mt-1">Perbarui data CPMI.</p>
                        </div>
                    </div>
                </div>
                <main className="max-w-6xl mx-auto px-5 sm:px-8 py-7">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white border border-slate-200 rounded-lg p-5">
                            <EditCPMI
                                nama={nama || cpmi.nama || ""}
                                setNama={setNama}
                                alamat={alamat || cpmi.alamatSesuaiKTP || ""}
                                setAlamat={setAlamat}
                                telephone={telephone || cpmi.telephone || ""}
                                setTelephone={setTelephone}
                                telephone_sekunder={telephone_sekunder || cpmi.telephone_sekunder || ""}
                                setTelephone_sekunder={setTelephone_sekunder}
                                namaOrtu={namaOrtu || cpmi.namaOrangTua || ""}
                                setNamaOrtu={setNamaortu}
                                telephoneOrtu={telephoneOrtu || cpmi.telephoneOrtu || ""}
                                setTelephoneOrtu={setTelephoneOrtu}
                                namaKerabat={namaKerabat || cpmi.namaKerabat || ""}
                                setNamaKerabat={setNamaKerabat}
                                telephoneKerabat={telephoneKerabat || cpmi.telephoneKerabat || ""}
                                setTelephoneKerabat={setTelephoneKerabat}
                                job={job || cpmi.job || ""}
                                setJob={setJob}
                                tanggalTerima={tanggalTerima || formatDateForInput(cpmi.tanggalTerima) || ""}
                                setTanggalTerima={setTanggalTerima}
                                tanggalBerangkat={tanggalBerangkat || formatDateForInput(cpmi.tanggalBerangkat) || ""}
                                setTanggalBerangkat={setTanggalBerangkat}
                                perusahaanPenempatan={perusahaanPenempatan || cpmi.perusahaanPenempatan || ""}
                                setPerusahaanPenempatan={setPerusahaanPenempatan}
                                kontrak={kontrak || cpmi.kontrak || ""}
                                setKontrak={setKontrak}
                                tempatPelatihan={tempatPelatihan || cpmi.tempatPelatihan || ""}
                                setTempatPelatihan={setTempatPelatihan}
                            />
                            <div className="p-2">
                                <h2 className="text-sm font-semibold text-slate-800">Simpan Perubahan</h2>

                                <p className="text-xs text-slate-400 mt-1 mb-4">Pastikan seluruh data sudah benar sebelum menyimpan.</p>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
            ({showSuccess && <ModalSukses onClose={() => router.push("/data-cpmi")} title="Edit CPMI" message="Berhasil Edit CPMI" />})
        </>
    );
}
