'use client';

import { useState } from 'react';
import { Check, CircleCheck } from 'lucide-react';
import FormRegistration from '../components/form/formPendaftaran/page';

const STEPS = [
    { id: 1, label: 'Data Diri' },
    { id: 2, label: 'Akademik & Tujuan' },
    { id: 3, label: 'Berkas Dokumen' },
    { id: 4, label: 'Tinjau & Kirim' },
];

export default function RegistrationForm() {
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAfterSuccess = () => {
        setShowSuccess(true);
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10 sm:px-6"
            style={{
                background: '#EEF0F4',
                backgroundImage: 'radial-gradient(#D7DCE5 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }}
        >
            <div className="w-full max-w-2xl">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                    {/* Stepper */}
                    <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100">
                        <ol className="flex items-center">
                            {STEPS.map((s, i) => (
                                <li key={s.id} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center gap-1.5 text-center">
                                        <div
                                            className={
                                                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ' +
                                                (s.id < step
                                                    ? 'bg-[#16223B] border-[#16223B] text-white'
                                                    : s.id === step
                                                      ? 'border-[#16223B] text-[#16223B] bg-white'
                                                      : 'border-slate-300 text-slate-400 bg-white')
                                            }
                                        >
                                            {s.id < step ? <Check className="w-3.5 h-3.5" /> : s.id}
                                        </div>
                                        <span
                                            className={
                                                'text-[11px] font-medium hidden sm:block ' +
                                                (s.id <= step ? 'text-slate-700' : 'text-slate-400')
                                            }
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div
                                            className={
                                                'flex-1 h-px mx-2 ' + (s.id < step ? 'bg-[#16223B]' : 'bg-slate-200')
                                            }
                                        />
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <FormRegistration step={step} setStep={setStep} />
                </div>

                <p className="text-center text-[11px] text-slate-400 mt-4">
                    Data yang Anda kirimkan akan diverifikasi oleh panitia pendaftaran.
                </p>
            </div>
        </div>
    );
}
