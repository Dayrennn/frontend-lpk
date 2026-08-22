export default function DocButton({ label, icon: Icon, url, onClick }) {
    if (!url) {
        return (
            <span
                title={label + ' — belum diunggah'}
                className="w-6 h-6 rounded-md flex items-center justify-center bg-slate-100 text-slate-300 cursor-not-allowed"
            >
                <Icon className="w-3.5 h-3.5" />
            </span>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            title={'Unduh ' + label}
            className="w-6 h-6 rounded-md flex items-center justify-center bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
        >
            <Icon className="w-3.5 h-3.5" />
        </button>
    );
}
