import { atom } from "jotai";
import { AurallyToken } from "../contracts/Aurally";

export const auraAtom = atom<AurallyToken | undefined>(undefined)
