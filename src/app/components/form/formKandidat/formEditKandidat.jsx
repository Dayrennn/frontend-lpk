import { Save, User, FileText, GraduationCap, Image as ImageIcon, Upload, IdCard } from "lucide-react";
import Akademik from "../../kandidat/Akademik";
import DataDiri from "../../kandidat/DataDiri";
import DokumenKandidat from "../../kandidat/Dokumen";
import InformasiKandidat from "../../kandidat/infoKandidat";
import DocumentPreview from "../../preview/documentPreview";
import { useState } from "react";

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

export default function EditKandidatForm({ kandidatList, onSubmit, updateLoading }) {
    const [dokumenBaru, setDokumenBaru] = useState({});

    const [nama, setNama] = useState(kandidatList.nama ?? "");
    const [tinggiBadan, setTinggiBadan] = useState(kandidatList.tinggi ?? "");
    const [berat_badan, setBerat_badan] = useState(kandidatList.berat_badan ?? "");
    const [umur, setUmur] = useState(kandidatList.umur ?? "");
    const [tgllahir, setTgllahir] = useState(kandidatList.tgllahir ? kandidatList.tgllahir.split("T")[0] : "");
    const [telephone, setTelephone] = useState(kandidatList.telephone ?? "");
    const [tujuan, setTujuan] = useState(kandidatList.tujuan ?? "");
    const [pendidikan, setPendidikan] = useState(kandidatList.pendidikan ?? "");
    const [bidang_pekerjaan, setBidang_pekerjaan] = useState(kandidatList.bidang_pekerjaan ?? "");
    const [dana, setDana] = useState(kandidatList.dana ?? "");
    const [status, setStatus] = useState(kandidatList.status ?? "");
    const [ojk, setOjk] = useState(kandidatList.ojk ?? "");
    const [pic, setPic] = useState(kandidatList.pic ?? "");
    const [keterangan, setKeterangan] = useState(kandidatList.keterangan ?? "");
    const [kabupatenId, setKabupatenId] = useState(kandidatList.kabupaten?.id ?? "");
    const [provinsiId, setProvinsiId] = useState(kandidatList.provinsi?.id ?? "");
    const [kacamatanId, setKacamatanId] = useState(kandidatList.kacamatan?.id ?? "");
    const [kelurahanId, setKelurahanId] = useState(kandidatList.kelurahan?.id ?? "");

    const [fotoFile, setFotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [kkFile, setKkFile] = useState(null);
    const [ktpFile, setKtpFile] = useState(null);
    const [ktpPendampingFile, setKtpPendampingFile] = useState(null);
    const [ijazahFile, setIjazahFile] = useState(null);
    const [sertifikatFile, setSertifikatFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // field biasa
        if (nama) {
            formData.append("nama", nama);
        }
        if (tinggiBadan) {
            formData.append("tinggi", tinggiBadan);
        }
        if (berat_badan) {
            formData.append("berat_badan", berat_badan);
        }
        if (tgllahir) {
            formData.append("tgllahir", tgllahir);
        }
        if (tujuan) {
            formData.append("tujuan", tujuan === "Lainnya" ? tujuanLainnya : tujuan);
        }
        if (pendidikan) {
            formData.append("pendidikan", pendidikan);
        }
        if (bidang_pekerjaan) {
            formData.append("bidang_pekerjaan", bidang_pekerjaan);
        }
        if (telephone) {
            formData.append("telephone", telephone);
        }
        if (dana) {
            formData.append("dana", dana);
        }
        if (status) {
            formData.append("status", status);
        }
        if (ojk) {
            formData.append("ojk", ojk);
        }
        if (pic) {
            formData.append("pic", pic);
        }
        if (keterangan) {
            formData.append("keterangan", keterangan);
        }
        if (kabupatenId) {
            formData.append("kabupatenId", kabupatenId);
        }
        if (provinsiId) {
            formData.append("provinsiId", provinsiId);
        }
        if (kacamatanId) {
            formData.append("kacamatanId", kacamatanId);
        }
        if (kelurahanId) {
            formData.append("kelurahanId", kelurahanId);
        }
        if (dokumenBaru.foto) {
            formData.append("foto", dokumenBaru.foto);
        }
        if (dokumenBaru.cv) {
            formData.append("cv", dokumenBaru.cv);
        }
        if (dokumenBaru.kk) {
            formData.append("kk", dokumenBaru.kk);
        }
        if (dokumenBaru.ktp) {
            formData.append("ktp", dokumenBaru.ktp);
        }
        if (dokumenBaru.ktp_pendamping) {
            formData.append("ktp_pendamping", dokumenBaru.ktp_pendamping);
        }
        if (dokumenBaru.ijazah) {
            formData.append("ijazah", dokumenBaru.ijazah);
        }
        if (dokumenBaru.sertifikat) {
            formData.append("sertifikat", dokumenBaru.sertifikat);
        }

        onSubmit(formData);
    };

    const handleFilesChange = (key, file) => {
        setDokumenBaru((prev) => ({ ...prev, [key]: file }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* DATA DIRI */}
                    <Section icon={User} title="Data Diri">
                        <DataDiri
                            nama={nama}
                            setNama={setNama}
                            tinggiBadan={tinggiBadan}
                            setTinggiBadan={setTinggiBadan}
                            berat_badan={berat_badan}
                            setBerat_badan={setBerat_badan}
                            umur={umur}
                            setUmur={setUmur}
                            tgllahir={tgllahir}
                            setTgllahir={setTgllahir}
                            kabupatenId={kabupatenId}
                            setKabupatenId={setKabupatenId}
                            provinsiId={provinsiId}
                            setProvinsiId={setProvinsiId}
                            telephone={telephone }
                            setTelephone={setTelephone}
                            kacamatanId={kacamatanId}
                            setKacamatanId={setKacamatanId}
                            kelurahanId={kelurahanId}
                            setKelurahanId={setKelurahanId}
                        />
                    </Section>

                    {/* AKADEMIK */}
                    <Section icon={GraduationCap} title="Akademik & Tujuan">
                        <Akademik
                            tujuan={tujuan}
                            setTujuan={setTujuan}
                            pendidikan={pendidikan}
                            setPendidikan={setPendidikan}
                            bidang_pekerjaan={bidang_pekerjaan}
                            setBidang_pekerjaan={setBidang_pekerjaan}
                            dana={dana}
                            setDana={setDana}
                            status={status}
                            setStatus={setStatus}
                            ojk={ojk}
                            setOjk={setOjk}
                            pic={pic}
                            setPic={setPic}
                            keterangan={keterangan}
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

                                <h2 className="text-sm font-semibold text-slate-800">Preview Pas Foto</h2>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-100">
                            <DocumentPreview title="Foto" icon={IdCard} url={fotoFile ? URL.createObjectURL(fotoFile) : kandidatList.fotoUrl} type="image" />
                            <label className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16223B] cursor-pointer hover:underline">
                                <Upload className="w-3.5 h-3.5" />
                                {fotoFile ? `Ganti file (${fotoFile.name})` : "Upload Pas Foto baru"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        setFotoFile(file);
                                        handleFilesChange("foto", file);
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* SAVE */}
                    <div className="bg-white border border-slate-200 rounded-lg p-5 sticky top-5">
                        <h2 className="text-sm font-semibold text-slate-800">Simpan Perubahan</h2>

                        <p className="text-xs text-slate-400 mt-1 mb-4">Pastikan seluruh data sudah benar sebelum menyimpan.</p>

                        <button
                            type="submit"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#16223B] text-white text-sm font-semibold hover:bg-[#0F1A2E] transition-colors"
                            disabled={updateLoading}
                        >
                            {updateLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
