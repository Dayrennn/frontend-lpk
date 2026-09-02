import { ChevronDown } from 'lucide-react';

export default function StatusDropdown({ value, onChange, options, colorMap = {} }) {
    const colorClass = colorMap[value] ?? 'bg-slate-50 text-slate-700 border-slate-200';

    return (
        <div className="relative inline-block">
            <select
                value={value}
                onChange={onChange}
                className={`appearance-none pl-3 pr-8 py-1.5 rounded-md text-xs font-medium border cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#16223B]/20 ${colorClass}`}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
        </div>
    );
}
