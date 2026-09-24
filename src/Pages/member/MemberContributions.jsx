// Path: src/Pages/member/MemberContributions.jsx
import { useEffect, useState } from "react";
import { contributionApi } from "@/services/api";

const currentYear = new Date().getFullYear();

export default function MemberContributions() {
    const [data, setData] = useState(null);

    useEffect(() => {
        contributionApi.getMine(currentYear).then(({ data }) => setData(data)).catch(console.error);
    }, []);

    if (!data) return <div className="p-6 text-sm text-gray-500">Chargement...</div>;

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Mes cotisations</h1>
            <p className="mt-1 text-sm text-gray-500">Année {data.year}</p>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-[#D6336C]">
                            {data.totalPaid.toLocaleString("fr-FR")} FCFA
                        </p>
                        <p className="text-sm text-gray-500">
                            sur {data.annualAmount.toLocaleString("fr-FR")} FCFA
                        </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">
                        Restant : {data.remaining.toLocaleString("fr-FR")} FCFA
                    </p>
                </div>

                <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full rounded-full bg-[#D6336C] transition-all"
                        style={{ width: `${data.progress}%` }}
                    />
                </div>
                <p className="mt-1 text-right text-xs text-gray-400">{Math.round(data.progress)}%</p>
            </div>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">Historique</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Montant</th>
                            <th className="px-4 py-3">Méthode</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.history.map((c) => (
                            <tr key={c._id}>
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    {c.amount.toLocaleString("fr-FR")} FCFA
                                </td>
                                <td className="px-4 py-3 capitalize text-gray-500">{c.method}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(c.paidAt).toLocaleDateString("fr-FR")}
                                </td>
                            </tr>
                        ))}
                        {data.history.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-3 text-gray-400">
                                    Aucun paiement enregistré.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}