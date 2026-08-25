export default function Akademik({
    tujuan,
    setTujuan,
    pendidikan,
    setPendidikan,
    bidang_pekerjaan,
    setBidang_pekerjaan,
    dana,
    setDana,
    status,
    setStatus,
    ojk,
    setOjk,
    pic,
    setPic,
    keterangan,
    setKeterangan,
}) {
    const inputClass =
        'w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white ' +
        'focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 focus:border-[#16223B]';
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Negara Tujuan</label>

                <select value={tujuan} onChange={(e) => setTujuan(e.target.value)} className={inputClass}>
                    <option value="jepang">Jepang</option>

                    <option value="kuwait">Kuwait</option>

                    <option value="turkey">Turkey</option>

                    <option value="albania">Albania</option>

                    <option value="montenegro">Montenegro</option>

                    <option value="lainnya">Lainnya</option>
                </select>
            </div>

            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Pendidikan Terakhir</label>

                <select value={pendidikan} onChange={(e) => setPendidikan(e.target.value)} className={inputClass}>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA/SMK">SMA/SMK</option>
                    <option value="D3">D3</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                </select>
            </div>

            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Posisi yang diinginkan</label>

                <input
                    type="text"
                    value={bidang_pekerjaan}
                    onChange={(e) => setBidang_pekerjaan(e.target.value)}
                    className={inputClass}
                />
            </div>

            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Pembiayaan</label>

                <select
                    value={dana}
                    onChange={(e) => {
                        const newDana = e.target.value;
                        setDana(newDana);

                        if (newDana === 'MANDIRI') {
                            setOjk('MANDIRI');
                        } else if (newDana === 'TALANG') {
                            setOjk('LOLOS');
                        }
                    }}
                    className={inputClass}
                >
                    <option value="">-- Pilih --</option>

                    <option value="MANDIRI">Mandiri</option>

                    <option value="TALANG">Talang</option>
                </select>
            </div>

            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Status</label>

                <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                    <option value="DRAFT">DRAFT</option>

                    <option value="TERVERIFIKASI">TERVERIFIKASI</option>
                    <option value="PERBAIKAN">PERBAIKAN</option>
                    <option value="MUNDUR">MUNDUR</option>
                </select>
            </div>

            <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">OJK</label>

                <select value={ojk} onChange={(e) => setOjk(e.target.value)} className={inputClass}>
                    <option value="BELUM">BELUM</option>
                    <option value="CHECKING">CHECKING</option>
                    <option value="LOLOS">LOLOS</option>
                    <option value="TIDAK_LOLOS">TIDAK LOLOS</option>
                    <option value="MANDIRI">MANDIRI</option>
                </select>
            </div>

            <div className="sm:col-span-2">
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">PIC</label>

                <input type="text" value={pic} onChange={(e) => setPic(e.target.value)} className={inputClass} />
            </div>

            <div className="sm:col-span-2">
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Keterangan</label>

                <textarea
                    rows={4}
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className={inputClass}
                    placeholder="Tambahkan keterangan..."
                />
            </div>
        </div>
    );
}
