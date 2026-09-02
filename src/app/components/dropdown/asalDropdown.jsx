import { useState } from "react";
import { useSeeAllAsalQuery } from "@/hooks/api/asalSliceAPI";

export default function AsalDropdown({ onChange }) {
    const { data, isLoading, isError } = useSeeAllAsalQuery();
    const asalList = data?.data || [];

    const [selectedProvinsi, setSelectedProvinsi] = useState("");
    const [selectedKabupaten, setSelectedKabupaten] = useState("");

    const kabupatenList = asalList.find((p) => p.id === selectedProvinsi)?.kabupaten || [];

    const handleProvinsiChange = (e) => {
        const provinsiId = e.target.value;
        setSelectedProvinsi(provinsiId);
        setSelectedKabupaten("");
        onChange?.({ provinsiId, kabupatenId: "" });
    };

    const handleKabupatenChange = (e) => {
        const kabupatenId = e.target.value;
        setSelectedKabupaten(kabupatenId);
        onChange?.({ provinsiId: selectedProvinsi, kabupatenId });
    };

    if (isLoading) return <p>Memuat data provinsi...</p>;
    if (isError) return <p>Gagal memuat data provinsi.</p>;

    return (
        <div className="flex gap-4">
            <select value={selectedProvinsi} onChange={handleProvinsiChange}>
                <option value="">Pilih Provinsi</option>
                {asalList.map((provinsi) => (
                    <option key={provinsi.id} value={provinsi.id}>
                        {provinsi.namaProvinsi}
                    </option>
                ))}
            </select>

            <select value={selectedKabupaten} onChange={handleKabupatenChange} disabled={!selectedProvinsi}>
                <option value="">Pilih Kabupaten/Kota</option>
                {kabupatenList.map((kabupaten) => (
                    <option key={kabupaten.id} value={kabupaten.id}>
                        {kabupaten.namaKabupaten}
                    </option>
                ))}
            </select>
        </div>
    );
}
