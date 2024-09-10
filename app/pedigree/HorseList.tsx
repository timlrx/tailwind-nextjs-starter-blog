import { Horse } from "@/types/Horse";
import roll_your_own from "./RollYourOwn";

const gatherNames = (horse: Horse): string[] => {
  // nameとpedigree_nameを配列に追加
  const names = [horse.name];
  if (horse.pedigree_name) {
    names.push(horse.pedigree_name);
  }

  // 再帰的にchildrenの名前を追加
  if (horse.children) {
    horse.children.forEach((child) => {
      names.push(...gatherNames(child));
    });
  }

  return names;
};

const createNameList = (horses: { [key: string]: Horse }): { [key: string]: string[] } => {
  const nameList: { [key: string]: string[] } = {};

  for (const key in horses) {
    nameList[key] = gatherNames(horses[key]);
  }

  return nameList;
};

const NameList = createNameList({
  roll_your_own,
});

export default NameList;
