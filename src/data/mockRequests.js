import { createMockResource } from '../lib/createMockResource.js'

const initialRequests = [
  {
    id: 'REQ-001',
    firstName: 'Issa',
    lastName: 'Kaboré',
    birthDate: '1998-04-12',
    gender: 'Homme',
    profession: 'Étudiant',
    phone: '+226 71 45 22 10',
    whatsapp: '+226 71 45 22 10',
    email: 'issa.kabore@example.com',
    city: 'Ouagadougou',
    motivation: "Je souhaite m'investir dans les actions humanitaires locales.",
    submittedAt: '2026-07-20',
    status: 'En attente', // 'Acceptée' | 'Refusée'
  },
]

const requestsResource = createMockResource(initialRequests)
export const useRequests = requestsResource.useResource
export const addRequest = requestsResource.add
export const updateRequest = requestsResource.update // Accepter / Refuser
export const removeRequest = requestsResource.remove

const waitlistResource = createMockResource([])
export const useWaitlist = waitlistResource.useResource
export const addWaitlistEntry = waitlistResource.add