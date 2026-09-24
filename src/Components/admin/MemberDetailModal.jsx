// Path: src/Components/admin/MemberDetailModal.jsx
import { useState } from "react";
import { userApi } from "@/services/api";
import { X, KeyRound } from "lucide-react";
import CredentialsModal from "./CredentialsModal";

export default function MemberDetailModal({ open, onClose, member }) {
    const [credentials, setCredentials] = useState(null);
    const [credModalOpen, setCredModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!open || !member) return null;

    const handleReset = async () => {
        if (!window.confirm(`Réinitialiser le mot de passe de ${member.fullName} ?`)) return;
        setLoading(true);
        try {
            const { data } = await userApi.resetPassword(member._id);
            setCredentials(data.credentials);
            setCredModalOpen(true);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la réinitialisation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                    <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                        <X className="size-5" />
                    </button>

                    <span className="font-semibold font-fraunces text-[#D6336C] text-2xl">{member.fullName}</span>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Identifiant</span>
                            <span className="font-mono font-semibold">{member.memberId}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Rôle</span>
                            <span className="font-semibold capitalize">{member.role}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-500">Statut connexion</span>
                            <span className="font-semibold">
                                {member.isFirstLogin ? "Jamais connecté" : "Actif"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Membre depuis</span>
                            <span className="font-semibold">
                                {new Date(member.createdAt).toLocaleDateString("fr-FR")}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleReset}
                        disabled={loading}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D6336C] py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        <KeyRound className="size-4" />
                        Réinitialiser le mot de passe
                    </button>
                </div>
            </div>

            <CredentialsModal
                open={credModalOpen}
                onClose={() => {
                    setCredModalOpen(false);
                    onClose();
                }}
                credentials={credentials}
            />
        </>
    );
}