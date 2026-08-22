export default function DataDiri({
    nama,
    setNama,
    tinggiBadan,
    setTinggiBadan,
    berat_badan,
    setBerat_badan,
    umur,
    setUmur,
    tgllahir,
    setTgllahir,
    asal,
    setAsal,
    telephone,
    setTelephone,
}) {


    const inputClass =
        'w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 bg-white ' +
        'focus:outline-none focus:ring-2 focus:ring-[#16223B]/10 focus:border-[#16223B]';
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nama Lengkap</label>

                    <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className={inputClass} />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tinggi Badan (cm)</label>

                    <input
                        type="number"
                        value={tinggiBadan}
                        onChange={(e) => setTinggiBadan(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Berat Badan (kg)</label>

                    <input
                        type="number"
                        value={berat_badan}
                        onChange={(e) => setBerat_badan(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Umur</label>

                    <input
                        type="number"
                        value={umur}
                        onChange={(e) => setUmur(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Tanggal Lahir</label>

                    <input
                        type="date"
                        value={tgllahir}
                        onChange={(e) => setTgllahir(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Asal Daerah</label>

                    <input
                        type="text"
                        value={asal}
                        onChange={(e) => setAsal('asal', e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Nomor Telephone</label>

                    <input
                        type="text"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className={inputClass}
                    />
                </div>
            </div>
        </>
    );
}
