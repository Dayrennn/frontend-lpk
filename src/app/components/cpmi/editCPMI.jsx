export default function EditCPMI({
    nama,
    setNama,
    alamat,
    setAlamat,
    telephone,
    setTelephone,
    telephone_sekunder,
    setTelephone_sekunder,
    namaOrtu,
    setNamaOrtu,
    telephoneOrtu,
    setTelephoneOrtu,
    namaKerabat,
    setNamaKerabat,
    telephoneKerabat,
    setTelephoneKerabat,
    job,
    setJob,
    tanggalTerima,
    setTanggalTerima,
    tanggalBerangkat,
    setTanggalBerangkat,
    perusahaanPenempatan,
    setPerusahaanPenempatan,
    kontrak,
    setKontrak,
    tempatPelatihan,
    setTempatPelatihan,
}) {
    const inputClass =
        "w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white " +
        "focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 focus:border-[#16223B]";
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>

                    <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Alamat Sesuai KTP</label>

                    <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone 1</label>

                    <input
                        type="number"
                        value={telephone}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 12) {
                                setTelephone(value);
                            }
                        }}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone 2</label>

                    <input
                        type="number"
                        value={telephone_sekunder}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 12) {
                                setTelephone_sekunder(value);
                            }
                        }}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Orang Tua</label>

                    <input type="text" value={namaOrtu} onChange={(e) => setNamaOrtu(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone Orang Tua</label>

                    <input
                        type="number"
                        value={telephoneOrtu}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 12) {
                                setTelephoneOrtu(value);
                            }
                        }}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Kerabat</label>

                    <input type="text" value={namaKerabat} onChange={(e) => setNamaKerabat(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone Kerabat</label>

                    <input
                        type="number"
                        value={telephoneKerabat}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 12) {
                                setTelephoneKerabat(value);
                            }
                        }}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Job</label>

                    <input type="text" value={job} onChange={(e) => setJob(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tanggal Diterima</label>

                    <input type="date" value={tanggalTerima} onChange={(e) => setTanggalTerima(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tanggal Berangkat</label>

                    <input type="date" value={tanggalBerangkat} onChange={(e) => setTanggalBerangkat(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Perusahaan Penempatan</label>

                    <input type="text" value={perusahaanPenempatan} onChange={(e) => setPerusahaanPenempatan(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Kontrak</label>

                    <input type="text" value={kontrak} onChange={(e) => setKontrak(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tempat Pelatihan</label>

                    <input type="text" value={tempatPelatihan} onChange={(e) => setTempatPelatihan(e.target.value)} className={inputClass} />
                </div>
            </div>
        </>
    );
}
