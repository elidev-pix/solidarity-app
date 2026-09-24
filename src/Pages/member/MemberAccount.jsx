// Path: src/Pages/member/MemberAccount.jsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext.jsx";
import { userApi, authApi } from "@/services/api";
import { Pencil, Save } from "lucide-react";

export default function MemberAccount() {
    const { session } = useAuth();
    const [fullName, setFullName] = useState(session?.fullName || "");
    const [editing, setEditing] = useState(false);
    const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
    const [saving, setSaving] = useState(false);

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${session?.memberId}`;

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            await userApi.updateMe(fullName);
            setEditing(false);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la mise à jour.");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!passwords.oldPassword || !passwords.newPassword) return;
        try {
            await authApi.changePassword(passwords.oldPassword, passwords.newPassword);
            setPasswords({ oldPassword: "", newPassword: "" });
            alert("Mot de passe mis à jour.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erreur lors du changement de mot de passe.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Mon compte</h1>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                    <img src={qrUrl} alt="QR code" className="mx-auto rounded-xl" />
                    <p className="mt-3 font-mono text-sm font-bold text-gray-700">{session?.memberId}</p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Informations personnelles</span>
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-1 text-xs font-semibold text-[#D6336C]"
                            >
                                <Pencil className="size-3.5" /> Modifier
                            </button>
                        ) : (
                            <button
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="flex items-center gap-1 text-xs font-semibold text-[#D6336C]"
                            >
                                <Save className="size-3.5" /> Enregistrer
                            </button>
                        )}
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                        <div>
                            <p className="text-xs text-gray-400">Nom complet</p>
                            {editing ? (
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-gray-200 p-2 text-sm"
                                />
                            ) : (
                                <p className="font-semibold text-gray-800">{fullName}</p>
                            )}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Identifiant</p>
                            <p className="font-mono font-semibold text-gray-800">{session?.memberId}</p>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-4">
                        <span className="text-sm font-semibold text-gray-700">Changer le mot de passe</span>
                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <input
                                type="password"
                                placeholder="Ancien mot de passe"
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                className="rounded-xl border border-gray-200 p-2.5 text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className="rounded-xl border border-gray-200 p-2.5 text-sm"
                            />
                        </div>
                        <button
                            onClick={handleChangePassword}
                            className="mt-3 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                        >
                            Mettre à jour
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}