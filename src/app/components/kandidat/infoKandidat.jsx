import { formatTanggalSimpel } from '@/hooks/helper/formatTanggal';

export default function InformasiKandidat({ dataKandidat }) {
    return (
        <>
            <div className="space-y-3 text-sm">
                <div>
                    <p className="text-xs text-slate-400">ID Kandidat</p>

                    <p className="font-medium text-slate-700 break-all mt-1">{dataKandidat.id}</p>
                </div>

                <div>
                    <p className="text-xs text-slate-400">Dibuat</p>

                    <p className="font-medium text-slate-700 mt-1">{formatTanggalSimpel(dataKandidat.createdAt)}</p>
                </div>

                <div>
                    <p className="text-xs text-slate-400">Terakhir diperbarui</p>

                    <p className="font-medium text-slate-700 mt-1">{formatTanggalSimpel(dataKandidat.updatedAt)}</p>
                </div>
            </div>
        </>
    );
}
