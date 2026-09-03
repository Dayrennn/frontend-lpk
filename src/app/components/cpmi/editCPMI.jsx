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

                    <input type="number" value={telephone} onChange={(e) => setTelephone(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone 2</label>

                    <input type="number" value={telephone_sekunder} onChange={(e) => setTelephone_sekunder(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Orang Tua</label>

                    <input type="text" value={namaOrtu} onChange={(e) => setNamaOrtu(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone Orang Tua</label>

                    <input type="number" value={telephoneOrtu} onChange={(e) => setTelephoneOrtu(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Kerabat</label>

                    <input type="text" value={namaKerabat} onChange={(e) => setNamaKerabat(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Telephone Kerabat</label>

                    <input type="number" value={telephoneKerabat} onChange={(e) => setTelephoneKerabat(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Job</label>

                    <input type="text" value={job} onChange={(e) => setJob(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tanggal Diterima</label>

                    <input type="date" value={tanggalTerima} onChange={(e) => setTanggalTerima(e.target.value)} className={inputClass} />
                </div>
            </div>
        </>
    );
}
