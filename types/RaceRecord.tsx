import { Grade, GradeCode } from './Grade';

interface RaceRecord {
  race: string, // レース名
  date: Date, // 日付
  grade: GradeCode, // 重賞格付け
  result: number, // 順位
}

export default RaceRecord

function Records({ ...rest }: RaceRecord) {
  const record: RaceRecord = { ...rest }
  return record
}
