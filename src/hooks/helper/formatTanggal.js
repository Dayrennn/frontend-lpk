export const formatTanggal = (tanggal) => {
    if (!tanggal) return '-';

    const date = new Date(tanggal);

    if (isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatTanggalSimpel = (iso) =>
    new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

export const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // ambil bagian sebelum "T"
};