import { atom } from 'jotai'
import { AurallyClient } from '../contracts/Aurally'
import { AppMetadata, AppReference } from '@algorandfoundation/algokit-utils/types/app'

export const appRefAtom = atom<(AppReference | AppMetadata) | undefined>(undefined)
export const appClientAtom = atom<AurallyClient | undefined>(undefined)
export const userAccountAtom = atom<WalletAccountType | undefined>(undefined)
