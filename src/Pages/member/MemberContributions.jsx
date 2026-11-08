import { useEffect, useState } from "react";
import { contributionApi } from "@/services/api";
import { Wallet } from "lucide-react";

const currentYear = new Date().getFullYear();
const methods = { especes: "Espèces", mobile_money: "Mobile Money", virement: "Virement", autre: "Autre" };

export default function MemberContributions() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        contributionApi.getMine(currentYear).then(({ data: result }) => setData(result))
            .catch((requestError) => { console.error(requestError); setError("Impossible de charger vos cotisations."); });
    }, []);

    if (error) return <div className="p-5 text-sm text-red-600">{error}</div>;
    if (!data) return <div className="p-5 text-sm text-gray-500">Chargement de vos cotisations…</div>;

    return (
        <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">SUIVI PERSONNEL</p><h1 className="mt-1 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Mes cotisations</h1><p className="mt-1 text-sm text-gray-500">Votre situation financière pour l'année {data.year}.</p></div>
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-medium text-gray-500">Montant déjà versé</p><p className="mt-2 text-3xl font-bold tracking-tight text-[#D6336C]">{data.totalPaid.toLocaleString("fr-FR")} <span className="text-sm font-semibold text-gray-400">FCFA</span></p><p className="mt-1 text-sm text-gray-500">sur {data.annualAmount.toLocaleString("fr-FR")} FCFA attendus</p></div><div className="rounded-xl bg-[#D6336C]/[0.07] p-4 sm:min-w-44"><p className="text-xs text-gray-500">Reste à verser</p><p className="mt-1 text-xl font-bold text-gray-900">{data.remaining.toLocaleString("fr-FR")} FCFA</p></div></div>
                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gradient-to-r from-[#D6336C] to-[#B36CB2] transition-all" style={{ width: `${data.progress}%` }}/></div><p className="mt-2 text-right text-xs font-semibold text-gray-500">{Math.round(data.progress)}% de l'objectif annuel</p>
            </section>
            <section><div className="mb-3 flex items-center gap-2"><Wallet size={17} className="text-[#D6336C]"/><h2 className="text-base font-bold text-gray-900">Historique des versements</h2></div>
                {data.history.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">Aucun paiement enregistré pour le moment.</div> : <>
                    <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:block"><table className="w-full text-left text-sm"><thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Montant</th><th className="px-4 py-3">Méthode</th><th className="px-4 py-3">Date</th></tr></thead><tbody className="divide-y divide-gray-100">{data.history.map((c) => <tr key={c._id}><td className="px-4 py-3 font-semibold text-gray-800">{c.amount.toLocaleString("fr-FR")} FCFA</td><td className="px-4 py-3 text-gray-500">{methods[c.method] || c.method}</td><td className="px-4 py-3 text-gray-500">{new Date(c.paidAt).toLocaleDateString("fr-FR")}</td></tr>)}</tbody></table></div>
                    <div className="grid grid-cols-1 gap-3 sm:hidden">{data.history.map((c) => <article key={c._id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="font-bold text-gray-900">{c.amount.toLocaleString("fr-FR")} FCFA</p><span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">Enregistré</span></div><p className="mt-2 text-xs text-gray-500">{methods[c.method] || c.method} · {new Date(c.paidAt).toLocaleDateString("fr-FR")}</p>{c.note && <p className="mt-2 text-xs text-gray-400">{c.note}</p>}</article>)}</div>
                </>}
            </section>
        </div>
    );
}