import { AppMetadata, AppReference } from '@algorandfoundation/algokit-utils/types/app'
import { atom } from 'jotai'
import { AurallyClient } from '../contracts/AurallyClient'

export const appRefAtom = atom<(AppMetadata | AppReference) | undefined>(undefined)
export const appClientAtom = atom<AurallyClient | undefined>(undefined)
export const userAccountAtom = atom<WalletAccountType | undefined>(undefined)
