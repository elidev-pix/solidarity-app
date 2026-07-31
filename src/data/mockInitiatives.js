import { createMockResource } from '../lib/createMockResource.js'

const initialInitiatives = [
  {
    id: 'INIT-001',
    author: 'Marie Ouédraogo',
    title: 'Atelier de sensibilisation au tri des déchets',
    description: 'Organiser un atelier dans les écoles primaires pour apprendre aux enfants le tri des déchets.',
    objective: 'Sensibiliser 200 élèves sur un trimestre',
    status: 'En attente', // 'Acceptée' | 'Refusée' | 'Archivée'
  },
]

const initiativesResource = createMockResource(initialInitiatives)
export const useInitiatives = initiativesResource.useResource
export const addInitiative = initiativesResource.add
export const updateInitiative = initiativesResource.update