import { Horse } from '@/types/Horse'
import { newDate } from 'app/lib/utils';
import dynamic from 'next/dynamic';
import RaceRecord from '@/types/RaceRecord';

const HL = dynamic(() => import('@/components/HorseLink'), { ssr: false });

const ROLL_YOUR_OWN: Horse = {
  name: 'ロールユアオーン',
  pedigree_name: 'Roll Your Own',
  foaled: '1924',
  died: '1944.12.21 死亡', // 血統書データサービス
  breeder: 'F.F. Simms, Xalapa Stud',
  owner: '社台牧場（北海道白老郡白老村）',
  sex: 'female',
  sire: 'Horron',
  color: '鹿毛',
  children: [
    {
      name: 'エスパリオン',
      pedigree_name: '博磊',
      foaled: '1935',
      sex: 'male',
      sire: 'ハクリユウ',
      breeder: '社台牧場（北海道白老郡白老村）',
      color: '栗毛',
      result_sum: '55戦9勝', // netkeiba『ロールユアオーン』コメント#2より 勝利数は『登録馬名簿 昭和18年1月31日現在』p.198 と一致
      result: '中央平地',
      earnings: '4.6万円',
      record: [
        { date: newDate(1939, 12, 2), race: '中山記念（秋）', grade: 'jrs_grade', result: 7 },
        { date: newDate(1940, 5, 4), race: '横浜特別（春）', grade: 'jrs_grade', result: 1 },
        { date: newDate(1940, 6, 3), race: '目黒記念（春）', grade: 'jrs_grade', result: 1 },
        { date: newDate(1940, 11, 16), race: '目黒記念（秋）', grade: 'jrs_grade', result: 2 },
        { date: newDate(1940, 12, 8), race: '中山記念（秋）', grade: 'jrs_grade', result: 1 },
        { date: newDate(1941, 4, 27), race: '帝室御賞典（春）', grade: 'jrs_big8', result: 3 },
        { date: newDate(1941, 5, 11), race: '目黒記念（春）', grade: 'jrs_grade', result: 4 },
        { date: newDate(1941, 11, 2), race: '帝室御賞典（秋）', grade: 'jrs_big8', result: 4 },
        { date: newDate(1941, 11, 9), race: '目黒記念（秋）', grade: 'jrs_grade', result: 5 },
        { date: newDate(1941, 12, 6), race: '中山記念（秋）', grade: 'jrs_grade', result: 3 },
        { date: newDate(1942, 4, 19), race: '帝室御賞典（春）', grade: 'jrs_big8', result: 7 },
      ]
    },
    {
      name: 'ミスロール',
      pedigree_name: '第参ロールユアオーン',
      foaled: newDate(1936, 5, 27),
      died: '1962.06.19 死亡',
      sex: 'female',
      sire: 'ハクリユウ',
      breeder: '社台牧場（北海道白老郡白老村）',
      color: '栗毛',
      result_sum: '33戦4勝',
      result: '中央平地17戦4勝 障害16戦0勝',
      earnings: '0.1万円',
      children: [
        {
          name: 'ロールフレイ',
          former_pedigree_name: 'トキノタマ',
          foaled: newDate(1948, 5, 15),
          died: '1968.12.30 死亡',
          sex: 'female',
          sire: 'トキノチカラ',
          breeder: '増本忠孝（北海道静内郡静内町）',
          color: '鹿毛',
          result_sum: '90戦9勝',
          result: '中央平地31戦3勝 障害59戦6勝',
          earnings: '321.5万円', // 『国営競馬統計 昭和28年』p.210
          record: [
            { date: newDate(1953, 10, 18), race: '京都大障害（秋）', grade: 'jra_jump', result: 4 },
          ],
          children: [
            {
              name: 'ロールメリー',
              former_name: 'フエアジヤパン',
              foaled: newDate(1955, 4, 6),
              sex: 'female',
              sire: 'タカクラヤマ',
              breeder: '増本孝一（北海道静内郡静内町）',
              color: '鹿毛',
              result_sum: '62戦11勝',
              result: '中央平地29戦3勝 障害33戦8勝',
              earnings: '11,562,510円',
              award: [{ year: 1960, award: '最優秀障害馬' }],
              record: [
                { date: newDate(1960, 6, 26), race: '中山大障害（春）', grade: 'jra_grandjump', result: 1 },
                { date: newDate(1960, 10, 9), race: '中山大障害（秋）', grade: 'jra_grandjump', result: 1 },
                { date: newDate(1961, 4, 23), race: '中山大障害（春）', grade: 'jra_grandjump', result: 3 },
                { date: newDate(1960, 5, 3), race: '東京障害特別（春）', grade: 'jra_jump', result: 2 },
                { date: newDate(1959, 11, 8), race: '東京障害特別（秋）', grade: 'jra_jump', result: 2 },
                { date: newDate(1959, 10, 11), race: '中山大障害（秋）', grade: 'jra_grandjump', result: 2 },
              ],
              summary: '中山大障害・春秋連覇の抽せん馬',
              details:
                `
抽せん馬「フエアジヤパン」として豊島美王麿に購買され、1957年デビュー。翌年から**ロールメリー**に改名、1959年5月より障害に転向。3戦目で障害初勝利を挙げ、その年の中山大障害（秋）では2着に健闘した。

そこからオープン3勝を積み上げて1960年中山大障害（春）に出走すると、1番人気に応えて7馬身差で快勝した。さらに直行した中山大障害（秋）も10馬身差で圧勝、2年前の**ケニイモア**以来2頭目の大障害春秋連覇を達成した。通年でも14戦5勝（5-5-1-3）、1度も掲示板を外さない活躍により最優秀障害馬に選ばれた。

翌1961年も現役を続行、中山大障害にも出走したが春3着・秋4着に終わった。この年を最後に引退、繁殖入りした記録がある[^CKN1961_108]が産駒は残っていない。
[^CKN1961_108]:『中央競馬年鑑 昭和36年』p.108
`
            }
          ]
        },
        {
          name: 'マツシラフジ',
          former_pedigree_name: 'ロールオン（ロールオーン）', // 『サラブレッド血統書 第5巻』p.300, 『サラブレッド血統書 第3巻』p.171
          foaled: newDate(1949, 5, 8),
          died: '1962.02.10 死亡', // 血統書データサービス
          sex: 'female',
          sire: 'トキノチカラ',
          breeder: '増本忠孝（北海道静内郡静内町）',
          color: '栗毛',
          result_sum: '未出走',
          children: [
            {
              name: 'シラフジヒメ',
              former_pedigree_name: '豊島',
              foaled: newDate(1953, 5, 22),
              died: '1975.04. 用途変更', // 血統書データサービス
              sex: 'female',
              sire: 'シマタカ',
              breeder: '増本忠孝（北海道静内郡静内町）',
              color: '鹿毛',
              result_sum: '69戦4勝',
              result: '中央平地',
              earnings: '226.1万円',
              children: [
                {
                  name: 'アイユウ',
                  foaled: newDate(1963, 2, 8),
                  died: '1975.08. 死亡', // 血統書データサービス
                  sex: 'female',
                  breeder: '（千葉県）',
                  sire: 'シーフユリユー(GB)',
                  color: '鹿毛',
                  result_sum: '未出走',
                  children: [
                    {
                      name: 'シリユース',
                      foaled: newDate(1968, 4, 5),
                      died: '1989.03. 用途変更', // 血統書データサービス
                      sex: 'female',
                      sire: 'テツソ(GB)',
                      breeder: '中村市太郎（青森県三戸郡）',
                      color: '栗毛',
                      result_sum: '25戦2勝',
                      result: '地方平地',
                      earnings: '269.0万円',
                      children: [
                        {
                          name: 'ショウフウグリーン',
                          local_name: 'シヨウフウグリーン',
                          foaled: newDate(1975, 2, 23),
                          sex: 'male',
                          sire: 'アレツ(FR)',
                          breeder: '東北牧場（青森県上北郡東北町）',
                          color: '栗毛',
                          result_sum: '45戦8勝',
                          result: '中央20戦4勝 地方25戦4勝',
                          earnings: '4438.9万円',
                          record: [
                            { date: newDate(1978, 8, 27), race: '小倉記念', grade: 'jra_grade', result: 1 },
                            { date: newDate(1979, 6, 10), race: '阪急杯', grade: 'jra_grade', result: 8 },
                            { date: newDate(1979, 5, 6), race: 'スワンS', grade: 'jra_grade', result: 4 },
                            { date: newDate(1978, 11, 12), race: '菊花賞', grade: 'jra_big8', result: 19 },
                            { date: newDate(1978, 10, 22), race: '京都新聞杯', grade: 'jra_grade', result: 15 },
                          ],
                          summary: '後の名伯楽・山内研二に重賞を勝たせた馬',
                          details:
                            `
1977年、2歳の秋にショウフウグリーンの名でデビュー。翌年5月に9戦目で初勝利。次走の300万下は9着に敗れたが、ダートから芝に戻し、鞍上を山内研二に替えたところ一気に3連勝。最軽量ハンデを活かして小倉記念を制し、人馬共に重賞初勝利を挙げた。

所謂「夏の登り馬」としてクラシック路線に参戦したが、京都新聞杯で10人気15着と惨敗、続くオープンも7着と敗れる。人馬共にG1初挑戦となる菊花賞では重賞勝ち馬ながら16番人気の低評価で、レースは中団につけるも最終3コーナーの坂で大失速。終わってみればブービー19着という大敗だった。なお大差の最下位には逃げて潰れたチェリーリュウが入った。

その後は鞍上交代や距離短縮を試みるも勝利には届かず、1980年から高知へ移籍。拗音の都合でシヨウフウグリーンと名を改め、25戦4勝の成績を残した。

なお最盛期を共にした山内研二は後に調教師として大成。**イシノサンデー**や**ダンツフレーム**を管理し、G1級8勝を含む重賞57勝を挙げることになる。そんな名伯楽が13年間の騎手人生で唯一掴んだ重賞勝利として、ショウフウグリーンはその名を残している。
`
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'メイジミドリ',
              pedigree_name: 'ミドリザン', // 『サラブレッド血統書 第5巻』p.300
              foaled: newDate(1955, 3, 3),
              sex: 'male',
              sire: 'トサミドリ',
              breeder: '増本忠孝（北海道静内郡静内町）',
              color: '鹿毛',
              result_sum: '21戦5勝',
              result: '中央平地',
              earnings: '265.1万円',
              record: [
                { date: newDate(1957, 12, 15), race: '阪神3歳S', grade: 'jra_grade', result: 1 },
                { date: newDate(1958, 4, 20), race: '皐月賞', grade: 'jra_big8', result: 12 },
                { date: newDate(1958, 5, 25), race: '東京優駿', grade: 'jra_big8', result: 19 },
                { date: newDate(1958, 6, 15), race: '毎日盃', grade: 'jra_grade', result: 8 },
                { date: newDate(1958, 6, 29), race: '宝塚盃', grade: 'jra_grade', result: 3 },
                { date: newDate(1958, 11, 30), race: '京都記念（秋）', grade: 'jra_grade', result: 1 },
              ],
              details:
                `
1957年の夏に函館でデビュー。3戦目の北海道3歳S（4着）の後から馬主が変わっている。年末の阪神3歳Sでは8番人気の低評価を覆し、1番人気スマロ（後のホウシユウクイン）を破って関西の2歳チャンピオンとなった。

しかし3歳になると成績が悪化、皐月賞・ダービー共に2桁着順に沈んでしまった。記録では毎回のように横行・後退・蹴りといった駐立不良を繰り返しており、気性が悪化していたのかもしれない。6月の宝塚盃（現在の阪急杯）では軽ハンデを味方に3着に入るも、左前繋靱帯炎を発症し9月の京都盃を取り消した。

それでも11月に復帰し、その復帰戦となるオープン戦で11カ月ぶりの勝利を挙げる。さらに連投で臨んだ京都記念（秋）も勝利して重賞2勝目を挙げた。しかしケガもあってか翌年上期の出走は1度のみ。秋に再度復帰するもかつての強さは戻らず、この年いっぱいでターフを去った。
`
            }
          ]
        },
        {
          name: 'マスラン',
          former_name: 'ハマハヤテ', // 『国営競馬統計 昭和28年』p.187
          former_pedigree_name: '第参ロールオンノ六', // 『サラブレッド血統書 第5巻』p.298
          foaled: newDate(1951, 4, 22),
          died: '1979.03.22 死亡', // 血統書データサービス
          sex: 'female',
          sire: 'シマタカ',
          breeder: '増本忠孝（北海道静内郡静内町）',
          color: '栗毛',
          result_sum: '28戦5勝',
          result: '中央平地28戦4勝 障害1戦0勝',
          earnings: '114.7万円',
          record: [
            { date: newDate(1954, 6, 27), race: '毎日杯', grade: 'jrs_grade', result: 2 },
          ],
          children: [
            {
              name: 'ライトニアン',
              foaled: newDate(1958, 2, 28),
              died: '1975.03.25 用途変更', // 血統書データサービス
              sex: 'female',
              sire: 'ボストニアン',
              breeder: '（北海道静内郡静内町）',
              color: '栗毛',
              result_sum: '未出走',
              children: [
                {
                  name: 'ジーガークイン',
                  foaled: newDate(1967, 6, 11),
                  died: '1992.01.01 用途変更', // 血統書データサービス
                  sex: 'female',
                  sire: 'リユウフオーレル',
                  breeder: '内藤牧場（北海道苫小牧市）', // POGDB
                  color: '鹿毛',
                  result_sum: '27戦1勝',
                  result: '中央平地',
                  earnings: '390.0万円',
                  children: [
                    {
                      name: 'ジーガーニジコ',
                      foaled: newDate(1975, 3, 20),
                      died: '1992.01.01 用途変更', // 血統書データサービス
                      sex: 'female',
                      sire: 'ファーザーズイメージ(USA)',
                      breeder: '坂東牧場（北海道沙流郡平取町）',
                      color: '栗毛',
                      result_sum: '3戦0勝',
                      result: '中央平地',
                      earnings: '116.0万円',
                      children: [
                        {
                          name: 'ジーガーギヤラント',
                          foaled: newDate(1983, 5, 20),
                          died: '1997.05.05 死亡', // 血統書データサービス
                          sex: 'female',
                          sire: 'タケシバオー',
                          breeder: '須崎牧場（北海道新冠郡新冠町）',
                          color: '黒鹿毛',
                          result_sum: '14戦0勝',
                          result: '中央平地',
                          earnings: '216.0万円',
                          children: [
                            {
                              name: 'ジーガーターセル',
                              foaled: newDate(1990, 3, 4),
                              died: '2008.09.23 用途変更', // 血統書データサービス
                              breeder: '須崎牧場（北海道新冠郡新冠町）',
                              sex: 'female',
                              sire: 'ホスピタリテイ',
                              color: '鹿毛',
                              result_sum: '18戦3勝',
                              result: '中央平地',
                              earnings: '2631.0万円',
                              children: [
                                {
                                  name: 'ジーガートップラン',
                                  foaled: newDate(1999, 4, 12),
                                  died: '2018.10.01 用途変更', // 血統書データサービス
                                  sex: 'female',
                                  sire: 'マヤノトップガン',
                                  breeder: '須崎牧場（北海道新冠郡新冠町）',
                                  color: '鹿毛',
                                  result_sum: '19戦1勝',
                                  result: '中央16戦1勝 地方3戦0勝',
                                  earnings: '710.0万円',
                                  children: [
                                    {
                                      name: 'キャッスルトップ',
                                      foaled: newDate(2018, 4, 20),
                                      sex: 'male',
                                      sire: 'バンブーエール',
                                      breeder: '城市公（北海道日高郡新ひだか町静内）',
                                      color: '黒鹿毛',
                                      result_sum: '38戦4勝',
                                      result: '中央1戦0勝 地方37戦4勝',
                                      earnings: '7281.0万円',
                                      award: [{ year: 2021, award: 'NAR3歳最優秀牡馬' }],
                                      record: [
                                        { date: newDate(2021, 7, 14), race: 'ジャパンDダービー', grade: 'nar_jpn1', result: 1 },
                                        { date: newDate(2021, 9, 15), race: '戸塚記念', grade: 'local_grade', result: 6 },
                                        { date: newDate(2021, 10, 3), race: 'ダービーGP', grade: 'local_grade', result: 5 },
                                        { date: newDate(2021, 12, 29), race: '東京大賞典', grade: 'nar_g1', result: 13 },
                                        { date: newDate(2022, 1, 23), race: 'アメリカJCC', grade: 'jra_g2', result: 14 },
                                        { date: newDate(2022, 2, 16), race: '報知グランプリC', grade: 'local_grade', result: 8 },
                                        { date: newDate(2022, 11, 2), race: 'サンタアニタT', grade: 'local_grade', result: 13 },
                                        { date: newDate(2022, 12, 22), race: 'ゴールドC', grade: 'local_grade', result: 8 },
                                        { date: newDate(2023, 1, 18), race: '船橋記念', grade: 'local_grade', result: 12 },
                                        { date: newDate(2023, 3, 15), race: 'ダイオライト記念', grade: 'nar_jpn2', result: 11 },
                                        { date: newDate(2023, 5, 24), race: '大井記念', grade: 'local_grade', result: 13 },
                                        { date: newDate(2023, 8, 9), race: 'フリオーソレジェンドC', grade: 'local_grade', result: 12 },
                                        { date: newDate(2024, 5, 1), race: 'かしわ記念', grade: 'nar_jpn1', result: 7 },
                                        { date: newDate(2024, 5, 15), race: '大井記念', grade: 'local_grade', result: 7 },
                                      ],
                                      summary: 'ブービー人気・単勝万馬券で3歳ダート王',
                                      details:
                                        `
2020年10月に船橋でデビュー。初戦で2着となるも2戦目は10着、そのまま勝ち上がりは3歳春に遅れた。しかしそこから3連勝で船橋の水無月特別（B3）を勝利し、3歳ダート王決定戦・ジャパンダートダービーにコマを進めた。

鞍上は11戦中7戦で手綱を執って2連勝中の仲野光馬の継続騎乗となった。連勝中とはいえつい2カ月前まで未勝利馬だったキャッスルトップの人気は低く、単勝129.5倍という13頭立ての12番人気に留まっていた。しかしレースでは果敢な逃げから直線で粘りこみ、追いすがるゴッドセレクションとウェルドーンをアタマ差抑えて優勝。騎手・調教師・馬主の全員がG1級競走初制覇、騎手と馬主はこれが初重賞勝利という記録づくめの勝利となった。

鞍上や「単勝万馬券」だけでなく、本馬の血統も大きな話題となった。サンデーサイレンスの血が一滴もない、**ロールユアオーン**系というマイナーな牝系、かつ母系に入っている種牡馬も内国産馬ばかり（母父のマヤノトップガンも珍しいが、**ボストニアン**や**リユウフオーレル**もかなり希少）という骨董品様とした血統が注目を集めたのである。

次走の戸塚記念では1番人気に支持されるも6着。ジャパンダートダービーの激走で燃え尽きてしまったのか、以降は20戦以上出走して馬券圏内は1度のみとなっている。
（2024年8月現在）
`
                                    },
                                  ]
                                },
                                {
                                  name: 'ジーガーウイング',
                                  foaled: newDate(2004, 4, 12),
                                  died: '2022.09.30 転売不明', // 血統書データサービス
                                  sex: 'male',
                                  sire: 'ウイングアロー',
                                  breeder: '須崎牧場（北海道新冠郡新冠町）',
                                  color: '鹿毛',
                                  result_sum: '28戦6勝',
                                  result: '中央14戦0勝 地方14戦6勝',
                                  earnings: '214.8万円',
                                  children: [
                                    {
                                      name: 'ジーガーローレンス',
                                      foaled: newDate(2016, 3, 7),
                                      died: '2023.03.18 用途変更', // 血統書データサービス
                                      sex: 'male',
                                      sire: 'ヘニーヒューズ(USA)',
                                      breeder: '須崎牧場（北海道新冠郡新冠町）',
                                      color: '鹿毛',
                                      result_sum: '16戦1勝',
                                      result: '中央15戦1勝 地方1戦0勝',
                                      earnings: '500.0万円',
                                    },
                                  ]
                                },
                              ]
                            },
                          ]
                        },
                      ]
                    },
                  ]
                },

              ]
            },
          ]
        }
      ]
    },
    {
      name: 'ヨシトク',
      pedigree_name: '第六ロールユアオーン',
      foaled: newDate(1940, 4, 18),
      died: '1965.12.02 死亡', // 血統書データサービス
      sex: 'female',
      sire: 'ステーツマン(GB)',
      breeder: '社台牧場（北海道白老郡白老村）',
      color: '鹿毛',
      result_sum: '2勝', // 「名牝の系譜」p.109 出走回数は不明
      result: '中央平地',
      earnings: '0.5万円以上',
      record: [
        { date: newDate(1943, 8, 1), race: '札幌農林省賞典四歳呼馬', grade: 'jrs_grade', result: 1 },
      ],
      children: [
        {
          name: 'ノーベル',
          former_pedigree_name: '日高学', // 「サラブレッド血統書 第四巻」p.283
          foaled: newDate(1949, 6, 20),
          died: '1954.03.15 薬殺',
          sex: 'male',
          sire: '大鵬',
          breeder: '辻芳雄（北海道浦河郡浦河町）',
          color: '鹿毛',
          result_sum: '57戦18勝',
          result: '中央平地',
          earnings: '5,333,760円', // 『中央競馬年鑑 昭和33年』p.138
          record: [
            { date: newDate(1951, 12, 16), race: '阪神3歳S', grade: 'jrs_grade', result: 4 },
            { date: newDate(1952, 11, 3), race: 'チヤレンヂC', grade: 'jrs_grade', result: 1 },
            { date: newDate(1952, 12, 1), race: '京都記念（秋）', grade: 'jrs_grade', result: 4 },
            { date: newDate(1953, 3, 21), race: '京都ステークス', grade: 'jrs_grade', result: 6 },
            { date: newDate(1953, 4, 12), race: '阪神記念', grade: 'jrs_grade', result: 7 },
            { date: newDate(1953, 5, 5), race: '天皇賞（春）', grade: 'jrs_big8', result: 5 },
            { date: newDate(1953, 6, 7), race: '鳴尾記念（春）', grade: 'jrs_grade', result: 4 },
            { date: newDate(1953, 8, 23), race: '中京開設記念', grade: 'jrs_grade', result: 5 },
            { date: newDate(1953, 9, 6), race: '金鯱賞', grade: 'jrs_grade', result: 5 },
            { date: newDate(1953, 9, 12), race: '愛知盃', grade: 'jrs_grade', result: 2 },
            { date: newDate(1953, 9, 20), race: '中日盃', grade: 'jrs_grade', result: 2 },
            { date: newDate(1953, 10, 25), race: '中山記念', grade: 'jrs_grade', result: 7 },
            { date: newDate(1953, 11, 15), race: '天皇賞（秋）', grade: 'jrs_big8', result: 4 },
            { date: newDate(1953, 11, 29), race: '毎日王冠', grade: 'jrs_grade', result: 7 },
            { date: newDate(1953, 12, 20), race: '中山特別', grade: 'jrs_grade', result: 7 },
          ],
          summary: '18勝を挙げ、同期の名牝に挑み続けた「サラ抽」一期生',
          details:
            `
サラブレッドの抽せん馬（共同購入）制度が復活した1951年。ノーベルはその一期生として上田清次郎に購買され、7月の京都でデビューした。2歳時の戦績は9戦4勝（4-4-0-1）。年末の阪神3歳ステークスこそテツノハナ・レダ・クインナルビーに続く4着に敗れたが、それ以外は全て連対という好成績を収める。3歳時には正月開催の京都で優勝。その後も勝ち星を積み重ね、秋にはハンデ重賞のチャレンジカップ（現在の朝日チャレンジカップ）に出走。同期のクインナルビーとレダ、1歳上の桜花賞馬ツキカワらを破って重賞初制覇を果たした。

順風満帆に思われたノーベルだったが、その後の道のりは厳しいものになる。阪神3歳ステークスで後塵を拝し、チャレンジカップで借りを返したクインナルビーとレダ、本格化した同期の2頭が大きな壁となった。

1953年の京都ステークス・天皇賞（春）・鳴尾記念（春）では、1着2着を入れ替えながらクインナルビーとレダがワンツーフィニッシュを繰り返した。レダは中京競馬場で新設重賞を2つ勝った。天皇賞を勝ち抜けたレダを追うようにクインナルビーは天皇賞（秋）を制した。これら全てのレースにノーベルはいて、つまりその全てで敗れていた。ノーベルはクインナルビーに9度、レダに6度も敗れた。平場では勝てているのだが、この2頭の前にはどうしても勝利が遠かった。

10月からは札幌の望月与一郎厩舎、東京の久保田彦之厩舎に転厩を繰り返した。11月末の毎日王冠では鳴尾記念（春）ぶりに3頭が揃ったが、この競走中にレダが故障を発生し予後不良となった。クインナルビーは14戦ぶりに馬券内を外す4着。ノーベルは生涯最低タイの7着に終わった。翌1954年の1月、日本経済新春杯3着を最後にクインナルビーは引退した。

年明け初戦となった3月14日東京のA特ハン、ノーベルは4コーナーで故障を発生し競走を中止。病名は「左主腕前哆開骨折」、翌3月15日に薬殺された。配布価格は55万円、獲得賞金は530万円を超えていた。
`
        }
      ]
    }
  ]
} as const satisfies Horse;

export default ROLL_YOUR_OWN