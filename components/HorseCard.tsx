import { tv } from 'tailwind-variants';
import { Horse } from '@/types/Horse'
import { sex as sexes } from '@/types/Horse';
import { Grade, GradeCode, grades } from '@/types/Grade'
import RaceRecord from '@/types/RaceRecord';
import { yearOf, compareDate } from 'app/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from "remark-breaks"
import HorseLink from './HorseLink';
import remarkGfm from 'remark-gfm';
import remarkHorseLink from 'plugins/remarkHorseLink/plugin.mjs';
import rehypeRaw from 'rehype-raw'

const summary = tv({
  base: 'px-5 py-1',
  variants: {
    sex: {
      male: 'bg-cyan-100',
      female: 'bg-red-50',
      gelding: 'bg-green-100',
    },
  }
});

type RecordsProp = {
  records: RaceRecord[]
}

// 詳細非表示時に表示するレース項目を抽出する
// recordsからnumber兼のレースを抽出
const filterRecords = (records: RaceRecord[], number: number) => {
  if (records.length == 0) {
    return records
  }
  // 重賞勝利を抽出
  const won_races = records.filter((record) => record.result == 1)
  // 重賞勝利数が{number}以上の場合、グレード→日付 の条件でソートし、重賞勝利のみを抽出
  if (won_races.length >= number) {
    return won_races.sort((a, b) => {
      if (a.grade != b.grade) {
        return grades[a.grade].rank - grades[b.grade].rank
      } else {
        return compareDate(a.date, b.date)
      }
    })
  }

  // 重賞勝利数が{number}未満の場合、着順→グレード→日付 の条件でソートし、上位{number}レースを抽出
  return records.sort((a, b) => {
    if (a.result != b.result) {
      return a.result - b.result
    } else if (a.grade != b.grade) {
      return grades[a.grade].rank - grades[b.grade].rank
    } else {
      return compareDate(a.date, b.date)
    }
  }).slice(0, number)
}

const BaseInfo = (horse: Horse): JSX.Element => {
  return (
    <>
      <span className="font-bold">{displayHorseName(horse)}</span> <span className='text-sm'>（{yearOf(horse.foaled)} by<HorseLink name={horse.sire} />）</span> {horse.result_sum} {horse.earnings}
    </>
  )
}

function HorseCard(horse: Horse) {
  const won_races: RaceRecord[] | undefined = horse.record?.filter((record) => record.result == 1)
  // 勝ち鞍の最高格付け 重賞勝ち鞍がない場合は0
  const horse_rank = won_races ? Math.max(...won_races.map((record) => grades[record.grade].rank)) : 0
  return (
    <div className="group-last-of-type:border-l-4 group-last-of-type:border-indigo-500 group-last-of-type:border-double">
      <div className="pt-3 -ml-2 ">
        <div className="card bg-base-100 shadow-xl rounded-none before:content-[''] before:w-4 before:h-4 before:bg-white before:opacity-50 before:mt-2 before:absolute before:display-block before:z-10">
          <HorseDetails {...horse} />
        </div >
      </div>
    </div>
  )
}

export default HorseCard


const HorseDetails = (horse: Horse) => {
  const summarized = filterRecords(horse.record || [], 3)
  if (horse.details) {
    return (
      <div className="">
        <details className="collapse collapse-arrow rounded-none ">
          <summary className={`collapse-title ${summary({ sex: horse.sex })} `}>
            <BaseInfo {...horse} />
            {summarized && (<br />)}
            {summarized && <RecordsSummary records={summarized} />}
          </summary>
          <div className="collapse-content rounded-none">
            {typeof horse.details === 'string' && (
              <ReactMarkdown
                remarkPlugins={[remarkBreaks, remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  p: ({ children }) => <p className="indent-4" style={{ marginBottom: "1em" }}>{children}</p>,
                  strong: ({ node, ...props }) => {
                    if (typeof props.children === 'string' && props.children.length > 0) {
                      return <HorseLink name={props.children} />;
                    }
                    return <strong {...props} />;
                  },
                }}
              >
                {horse.details}
              </ReactMarkdown>
            )}
          </div>
        </details>
      </div>
    )
  } else {
    return (
      <div className={`${summary({ sex: horse.sex })}`}>
        <BaseInfo {...horse} />
        {summarized && (<br />)}
        {summarized && <RecordsSummary records={summarized} />}
      </div>
    )
  }
}

// 馬名を整形する
// 競走名 / 血統名 (旧名 or 地方名)
function displayHorseName(horse: Horse): string {
  const base = horse.pedigree_name ? `${horse.name} / ${horse.pedigree_name}` : `${horse.name}`
  const display_name = horse.former_name ? `${base} (${horse.former_name})`
    : horse.local_name ? `${base} (${horse.local_name})` : base
  return display_name
}

const raceName = tv({
  variants: {
    rank: {
      1: 'text-red-700',
      2: 'text-blue-500',
      3: 'text-green-500',
      4: '',
      5: '',
    },
    win: {
      true: 'font-bold',
    }
  }
});

const groupByYear = (records: RaceRecord[]) => {
  if (!Array.isArray(records)) {
    console.error("records is not an array:", records);
    return;
  }
  return records.reduce((acc, record) => {
    const year = record.date.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(record);
    return acc;
  }, {} as Record<number, RaceRecord[]>);
};

const RecordFormatter = (record: RaceRecord): JSX.Element => {
  return (
    <>
      {record.result != 1 && <span>（{record.result}着）</span>}
      <span className={`mr-1 ${raceName({ rank: grades[record.grade].rank, win: record.result == 1 })}`}>{record.race}</span>
    </>
  )
}

const RecordsFormatter = (props: RecordsProp): JSX.Element => {
  const grouped = groupByYear(props.records)
  return (
    <>
      {grouped && Object.entries(grouped).map(([year, records]) => (
        <div>
          <span className="mr-1">
            {year}
          </span>
          {records.map((record) => RecordFormatter(record))}
        </div>
      ))}
    </>
  )
}

const RecordsSummary = (props: RecordsProp): JSX.Element => {
  const records: RaceRecord[] = props.records
  return (
    <>
      {records.map((record) => (
        <span className='ml-3'>
          < RecordFormatter {...record} />
          <span className='text-sm'>（{yearOf(record.date)}）</span>
        </span>
      ))}
    </>
  )
}