import { createMockResource } from '../lib/createMockResource.js'

const initialMembers = [
  {
    id: 'SG-2026-001',
    firstName: 'Marie',
    lastName: 'Ouédraogo',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    phone: '+226 70 12 34 56',
    whatsapp: '+226 70 12 34 56',
    email: 'marie.ouedraogo@example.com',
    city: 'Ouagadougou',
    joinedAt: '2026-01-15',
    status: 'Actif',
  },
  {
    id: 'SG-2026-002',
    firstName: 'Aminata',
    lastName: 'Traoré',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200',
    phone: '+226 76 22 11 09',
    whatsapp: '+226 76 22 11 09',
    email: 'aminata.traore@example.com',
    city: 'Bobo-Dioulasso',
    joinedAt: '2026-02-02',
    status: 'En attente',
  },
]

const membersResource = createMockResource(initialMembers)

export const useMembers = membersResource.useResource
export const addMember = membersResource.add
export const updateMember = membersResource.update
export const removeMember = membersResource.remove