// Path: src/Components/admin/BulkImportModal.jsx
import { useState } from "react";
import { userApi } from "@/services/api";
import { X } from "lucide-react";

export default function BulkImportModal({ open, onClose, onDone }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleImport = async () => {
        const members = text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [fullName = "", email = "", phone = ""] = line.split(";").map((value) => value.trim());
                return { fullName, email, phone };
            })
            .filter((member) => member.fullName);

        if (members.length === 0) return;

        setLoading(true);
        try {
            const { data } = await userApi.bulkCreate(members);
            const report = data.created
                .map((c) => c.fullName + " — " + c.memberId + " / " + c.tempPassword + " — " + (c.emailSent === true ? "e-mail envoyé" : c.emailSent === false ? "e-mail non envoyé" : "sans e-mail"))
                .join("\n");
            navigator.clipboard.writeText(report);
            const failedEmails = data.created.filter((member) => member.emailSent === false).length;
            alert(data.created.length + " membre(s) créé(s). Identifiants copiés. " + (failedEmails ? failedEmails + " e-mail(s) non envoyé(s)." : "Les envois e-mail ont été traités."));
            setText("");
            onDone?.();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'import.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="size-5" />
                </button>

                <span className="font-semibold font-fraunces text-[#D6336C] text-2xl">Import de membres</span>
                <p className="mt-2 text-sm text-gray-600">Une personne par ligne : <span className="font-mono">Nom complet; e-mail; téléphone</span>. Les deux derniers champs sont facultatifs.</p>

                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                    placeholder={"Awa Traoré; awa@example.com; +226 70 00 00 00\nIssouf Kaboré;; +226 76 00 00 00\n..."}
                    className="mt-4 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                />

                <button
                    onClick={handleImport}
                    disabled={loading || !text.trim()}
                    className="mt-4 w-full rounded-full bg-[#D6336C] py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Import en cours..." : "Importer"}
                </button>
            </div>
        </div>
    );
}