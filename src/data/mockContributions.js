import { createMockResource } from '../lib/createMockResource.js'

export const MONTHLY_FEE_AMOUNT = 1000 // FCFA

const initialContributions = [
  { id: '2026-01', month: 'Janvier', amount: 1000, status: 'Payé' },
  { id: '2026-02', month: 'Février', amount: 1000, status: 'Payé' },
  { id: '2026-03', month: 'Mars', amount: 1000, status: 'Payé' },
  { id: '2026-04', month: 'Avril', amount: 1000, status: 'En attente' },
  { id: '2026-05', month: 'Mai', amount: 1000, status: 'En attente' },
  { id: '2026-06', month: 'Juin', amount: 1000, status: 'En attente' },
  { id: '2026-07', month: 'Juillet', amount: 1000, status: 'En attente' },
  { id: '2026-08', month: 'Août', amount: 1000, status: 'En attente' },
  { id: '2026-09', month: 'Septembre', amount: 1000, status: 'En attente' },
  { id: '2026-10', month: 'Octobre', amount: 1000, status: 'En attente' },
  { id: '2026-11', month: 'Novembre', amount: 1000, status: 'En attente' },
  { id: '2026-12', month: 'Décembre', amount: 1000, status: 'En attente' },
]

const contributionsResource = createMockResource(initialContributions)
export const useContributions = contributionsResource.useResource
export const updateContribution = contributionsResource.update // marquer "Payé"