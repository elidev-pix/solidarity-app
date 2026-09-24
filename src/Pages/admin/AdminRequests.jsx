// Path: src/Pages/admin/AdminRequests.jsx
import MembershipRequestsTable from "@/Components/admin/MembershipRequestsTable";

export default function AdminRequests() {
    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Demandes d'adhésion</h1>
            <p className="mt-1 text-sm text-gray-500">Traite les demandes reçues via le formulaire public.</p>
            <div className="mt-6">
                <MembershipRequestsTable />
            </div>
        </div>
    );
}