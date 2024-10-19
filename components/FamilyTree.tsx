import { tv } from 'tailwind-variants';
import HorseCard from "./HorseCard";
import type { Horse } from "@/types/Horse";
import pedigreeList from "@/pedigree/index";
import { compareDate, toDate } from "app/lib/utils";

const FamilyTree = ({ name }): JSX.Element => {
  const horse = pedigreeList.get(name);
  if (!horse) return (<div>pedigreeが存在しません; ${name}</div>)

  return (
    <div className="root" >
      <Branch key='root' id='root' border={'root'} horse={horse} />
    </div>
  )
}

export default FamilyTree

const branch = tv({
  base: 'ml-4 pwid',
  variants: {
    // 牝系図の線を制御
    border: {
      last: "border-none [&>.horse-card]:border-l-4 [&>.horse-card]:border-indigo-500 [&>.horse-card]:border-double",
      default: "border-l-4 border-indigo-500 border-double",
      root: ""
    },
  }
});
function Branch({ horse, id, border }) {
  const children = horse.children ? horse.children.toSorted((a, b) => compareDate(a.foaled, b.foaled)) : [];
  return (
    <div className={branch({ border })} id={id}>
      {HorseCard(horse)}
      {children.map((child: Horse, index: number) => (
        <Branch horse={child} key={`${child.name}-${child.foaled}`} id={`${child.id_name ? child.id_name : child.name}`} border={`${(index === children.length - 1) ? 'last' : 'default'}`} />
      ))}
    </div>
  )
};