// Path: src/Components/admin/CredentialsModal.jsx
import { useState } from "react";
import { X, Copy, Check } from "lucide-react";

export default function CredentialsModal({ open, onClose, credentials }) {
    const [copied, setCopied] = useState(false);

    if (!open || !credentials) return null;

    const { memberId, tempPassword } = credentials;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`Identifiant: ${memberId}\nMot de passe: ${tempPassword}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="size-5" />
                </button>

                <span className="font-semibold font-fraunces text-[#D6336C] text-2xl">
                    Accès créé avec succès
                </span>
                <p className="mt-2 text-sm text-gray-600">
                    Transmets ces identifiants au membre. Ils ne seront plus affichés ensuite.
                </p>

                <div className="mt-6 space-y-3">
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-400">Identifiant</p>
                        <p className="mt-1 font-mono text-lg font-bold text-gray-800">{memberId}</p>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-gray-400">Mot de passe temporaire</p>
                        <p className="mt-1 font-mono text-lg font-bold text-gray-800">{tempPassword}</p>
                    </div>
                </div>

                <button
                    onClick={handleCopy}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D6336C] py-2.5 font-semibold text-white transition hover:opacity-90"
                >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? "Copié !" : "Copier les identifiants"}
                </button>
            </div>
        </div>
    );
}