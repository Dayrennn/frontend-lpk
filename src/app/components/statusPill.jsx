export default function StatusPill({ value, colorMap }) {
    const colorClass = colorMap[value] ?? 'bg-slate-50 text-slate-500 border-slate-200';
    return (
        <span
            className={`${'inline-block max-w-[12rem] truncate px-2.5 py-1 rounded-md text-xs font-medium border'} ${colorClass}`}
            title={value}
        >
            {value || '-'}
        </span>
    );
}