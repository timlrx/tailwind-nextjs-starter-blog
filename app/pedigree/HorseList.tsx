import { Horse } from "@/types/Horse";
import roll_your_own from "./RollYourOwn";
import florries_cup from "./FlorriesCup";
import pedigreeList from ".";

const horseLinkMap: Map<string, { name: string; link: string; family: string }> = new Map();

const createHorseLinkMap = (horse: Horse, family: string): Map<string, { name: string; link: string; family: string }> => {
  // HorseLink生成用のMap
  // key: リンク生成用の馬名（一意）
  // value.name: リンク文字列として表示する馬名
  // value.link: リンク先の馬のid
  // value.family: リンク先の馬の牝系
  // const horseLinkMap: Map<string, { name: string; link: string; family: string }> = new Map();

  // key=name, および pedigree_name
  // id_name がある場合は name=key, link=id_name, なければ link=name
  if (horse.id_name) {
    horseLinkMap.set(horse.id_name, { name: horse.name, link: horse.id_name, family: family });
    if (horse.pedigree_name) {
      horseLinkMap.set(horse.pedigree_name, { name: horse.pedigree_name, link: horse.id_name, family: family });
    }
  } else {
    horseLinkMap.set(horse.name, { name: horse.name, link: horse.name, family });
    if (horse.pedigree_name) {
      horseLinkMap.set(horse.pedigree_name, { name: horse.pedigree_name, link: horse.name, family: family });
    }
  }
  // 再帰的にchildrenも追加
  if (horse.children) {
    horse.children.forEach((child) => {
      createHorseLinkMap(child, family);
    })
  }
  console.log(horseLinkMap)
  return horseLinkMap
};

// pedigreeListをhorseMapに追加
const mergeHorseLinkMapByPedigree = (pedigreeList: Map<string, Horse>): Map<string, { name: string; link: string; family: string }> => {
  const mergedMap = new Map<string, { name: string; link: string; family: string }>();

  // pedigreeList をループして createHorseLinkMap を呼び出し、それぞれの結果をマージ
  pedigreeList.forEach((horse, family) => {
    console.log(horse)
    console.log(family)
    const horseLinkMap = createHorseLinkMap(horse, family);

    // 統合: 既存のキーがあれば上書きされる
    horseLinkMap.forEach((value, key) => {
      mergedMap.set(key, value);
    });
  });
  console.log(mergedMap)
  return mergedMap; // 統合された Map を返す
}

const mergedHorseLinkMap = mergeHorseLinkMapByPedigree(pedigreeList);

export default mergedHorseLinkMap
