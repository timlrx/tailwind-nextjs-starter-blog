import { Horse } from "@/types/Horse"

import ROLL_YOUR_OWN from "./RollYourOwn"
import FLORRIES_CUP from "./FlorriesCup";

type PedigreeList = {
  [key: string]: Horse
}


const pedigreeList = new Map<string, Horse>([
  ['roll_your_own', ROLL_YOUR_OWN],
  ['florries_cup', FLORRIES_CUP],
]);

export default pedigreeList
