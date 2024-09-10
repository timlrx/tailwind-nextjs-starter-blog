import { tv } from 'tailwind-variants';
import HorseCard from "./HorseCard";
import type { Horse } from "@/types/Horse";
import { pedigreeList } from "@/pedigree/index";
import { compareDate, toDate } from "app/lib/utils";

const FamilyTree = ({ name }): JSX.Element => {
  const horse = pedigreeList.get(name);
  if (!horse) return (<div>pedigreeが存在しません; ${name}</div>)

  return (
    <div className="root" >
      <Branch key='root' id='root' isRoot horse={horse} />
    </div>
  )
}

export default FamilyTree

const branch = tv({
  base: 'ml-4 pwid',
  variants: {
    isRoot: {
      false: "group border-l-4 border-indigo-500 border-double last-of-type:border-none",
    },
  }
});
function Branch({ horse, id, isRoot }) {
  const children = horse.children ? horse.children.toSorted((a, b) => compareDate(a.foaled, b.foaled)) : [];
  return (
    <div className={branch({ isRoot })} id={id}>
      {HorseCard(horse)}
      {children.map((child) => (
        <Branch horse={child} key={`${child.name}-${child.foaled}`} id={`${child.name}`} isRoot={false} />
      ))}
    </div>
  )
};