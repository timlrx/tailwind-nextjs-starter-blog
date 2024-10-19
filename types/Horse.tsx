import RaceRecord from './RaceRecord';
import { Award } from './Award';

// 現役中に去勢した場合のみセン
// const Sex = {
//   MALE: '牡',
//   FEMALE: '牝',
//   GELDING: 'セン',
// } as const;

// export type Sex = typeof Sex[keyof typeof Sex];
// // 全てのtypeを配列として取得
// export const AllSex = Object.values(Sex);

export type Sex = 'male' | 'female' | 'gelding';

export const sex: { [key in Sex]: string } = {
  male: '牡',
  female: '牝',
  gelding: 'セン',
}

interface Horse {
  name: string, // 競走名
  pedigree_name?: string, // 血統名
  former_name?: string, // 改名前の競走名など
  local_name?: string, // 地方転出後の馬名
  former_pedigree_name?: string, // 出生時の血統名など（繁殖入り時に使われなかったもの）
  id_name?: string, // 同名馬を一意に識別するための名前
  foaled: string | Date, // 生年月日
  sex: Sex, // 性別
  breed?: string, // 品種
  breeder?: string, // 生産者
  sire: string, // 父
  children?: Horse[], // 産駒
  link?: string, // リンク 使うかは微妙
  color?: string, // 毛色
  summary?: string, // 見出し
  details?: JSX.Element | string, // 詳細記事
  result_sum?: string, // 通算成績
  result?: string, // 通算成績詳細 （）でくくって書く
  earnings?: string, // 獲得賞金
  award?: { year: number, award: Award }[], // 受賞
  record?: RaceRecord[], // 重賞成績
  citation?: string[], // 参考文献
  // 以下は後々追加 一旦は不要
  retired?: string, // 抹消日
  died?: string, // 死亡日
  foaled_at?: string, // 生産地
  owner?: string, // 馬主
  trainer?: string, // 調教師
}

export type { Horse }
