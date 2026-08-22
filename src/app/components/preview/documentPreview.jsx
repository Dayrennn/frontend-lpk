import { ExternalLink, FileText } from "lucide-react";

export default function DocumentPreview({ title, icon: Icon, url, type }) {
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 min-w-0">
                    <Icon className="w-4 h-4 text-slate-500 shrink-0" />

                    <span className="text-sm font-semibold text-slate-700 truncate">{title}</span>
                </div>

                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#16223B] hover:underline"
                    >
                        <ExternalLink className="w-3 h-3" />
                        Buka
                    </a>
                )}
            </div>

            {!url ? (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400">
                    <FileText className="w-8 h-8 mb-2" />

                    <p className="text-xs">Dokumen belum tersedia</p>
                </div>
            ) : type === 'pdf' ? (
                <iframe src={url} title={title} className="w-full h-[500px] bg-slate-100" />
            ) : (
                <div className="bg-slate-100 p-4">
                    <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                        <img src={url} alt={title} className="w-full h-auto max-h-[500px] object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
}