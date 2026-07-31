import { createMockResource } from '../lib/createMockResource.js'

const initialEvents = [
  {
    id: 'EVT-001',
    title: 'Rencontre partenaires',
    description: "Rencontre annuelle avec les partenaires pour l'organisation d'activités de salubrité",
    date: '2026-08-16',
    time: '15:00',
    place: 'Koulouba',
    image: '/don1.jpg',
  },
  {
    id: 'EVT-002',
    title: 'Visite Orphelinat',
    description: 'Distribution de vivres et moments partagés avec les enfants',
    date: '2026-08-22',
    time: '10:00',
    place: 'Ouagadougou',
    image: '/don2.jpg',
  },
]

const eventsResource = createMockResource(initialEvents)
export const useEvents = eventsResource.useResource
export const addEvent = eventsResource.add
export const updateEvent = eventsResource.update
export const removeEvent = eventsResource.remove

// Deviendra une table de jointure member_id/event_id sous Supabase.
// { memberId: { eventId: 'confirmé' | 'indisponible' } }
export const participations = {}