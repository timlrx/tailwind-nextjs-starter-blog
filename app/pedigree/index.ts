import { Horse } from "@/types/Horse"

import ROLL_YOUR_OWN from "./RollYourOwn"

type PedigreeList = {
  [key: string]: Horse
}


export const pedigreeList = new Map<string, Horse>([
  ['roll_your_own', ROLL_YOUR_OWN],
]);

