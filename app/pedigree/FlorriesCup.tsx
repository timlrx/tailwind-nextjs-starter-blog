import { Horse } from '@/types/Horse'
import { newDate } from 'app/lib/utils';
import dynamic from 'next/dynamic';
import RaceRecord from '@/types/RaceRecord';

const HL = dynamic(() => import('@/components/HorseLink'), { ssr: false });

const FLORRIES_CUP: Horse = {
  name: 'フロリースカツプ',
  pedigree_name: 'Florries Cup',
  foaled: '1907',
  sex: 'female',
  sire: 'Florizel',
  breeder: 'W. C. Whitney',
  color: '黒鹿毛',
  children: [
    {
      name: '第二フロリースカツプ',
      foaled: newDate(1909, 3, 24),
      sex: 'female',
      sire: 'インタグリオー(GB)',
      breeder: '小岩井農場（岩手県岩手郡雫石村）',
      color: '黒鹿毛',
      children: [
        {
          name: 'プロデアー',
          pedigree_name: 'フロリカルチユアー',
          foaled: newDate(1918, 3, 20),
          sex: 'female',
          sire: 'ルーヂゲーア(GB)',
          breeder: '小岩井農場（岩手県岩手郡雫石村）',
          color: '黒鹿毛',
          children: [
            {
              name: 'レパード',
              pedigree_name: 'ナスノー',
              foaled: newDate(1929, 5, 4),
              died: '1952.08.24 死亡', // 血統書データサービス
              sex: 'female',
              sire: 'ロイヂユール(GB)',
              breeder: '大平市太郎（岩手県盛岡市上小路）',
              color: '鹿毛',
              result_sum: '未出走（1勝？）', // 『名牝の系譜』p.54では1933小倉新馬1勝 『優秀四歳馬年鑑』p.61では未出走
              children: [
                {
                  name: 'ナスノタケ',
                  foaled: '1946',
                  retired: '1951.03.22 地方競馬',
                  sex: 'male',
                  sire: 'マルタケ',
                  breeder: 'マルタケ牧場（北海道沙流郡門別村）', // 『サラブレッド血統書 第3巻』p.96
                  color: '鹿毛',
                  result_sum: '40戦15勝',
                  result: '中央平地36戦14勝 障害4戦1勝', // 『国営競馬統計 昭和26年』p.151,179, 『国営競馬成績書 昭和25年 秋季』p.300
                  earnings: '3,387,600円（中央）', // 『国営競馬統計 昭和28年』p.209
                  record: [
                    { date: newDate(1949, 11, 3), race: '菊花賞', grade: 'jrs_big8', result: 5 },
                    { date: newDate(1950, 4, 16), race: '京都記念（春）', grade: 'jrs_grade', result: 3 },
                    { date: newDate(1950, 5, 7), race: '阪神記念（春）', grade: 'jrs_grade', result: 1 },
                    { date: newDate(1950, 6, 4), race: '天皇賞（春）', grade: 'jrs_big8', result: 2 },
                    { date: newDate(1950, 11, 3), race: '天皇賞（秋）', grade: 'jrs_big8', result: 7 },
                    { date: newDate(1950, 11, 26), race: 'チャレンジC', grade: 'jrs_grade', result: 5 },
                  ],
                  summary: '泡と消えた「父子4代・帝室御賞典馬」の夢',
                  details:
                    `
父**マルタケ**の馬主が運営するマルタケ牧場で1946年に生まれる。1949年2回小倉で初出走。菊花賞こそ6頭立て5着に沈んだものの、年間で8勝を挙げる活躍を見せた。さらに翌1950年には京都記念（春）を3着とし、続く阪神記念（春）で1着。1段飛ばしで着順を上げて重賞勝利をつかみ取った。

余勢を駆って天皇賞（春）へ向かうナスノタケにはある大記録が懸かっていた。曾祖父**ラシカツター**、祖父**ハクリユウ**、父**マルタケ**による父子3代帝室御賞典（天皇賞）制覇、それを「父子4代」に更新する挑戦である。ラシカツターとハクリユウが勝ったのは統一前の「帝室御賞典」ではあるものの、それを除いても**マルタケ**との「史上初の父子制覇」となる。3000mの京都記念（春）での好走、上がり調子、血統背景、そして往年のファンの夢が託されたのだろうか、ナスノタケは1番人気に推された。

当日の馬場は稍重。勝利したのは9頭立て8番人気の**オーエンス**で、ナスノタケは3馬身離された2着に終わった。再び挑んだ天皇賞（秋）では前目につけるも直線失速し7着に敗れた。翌年には障害に転向し4戦1勝、その春に地方競馬へ転出。ここにナスノタケの夢は潰えた。その後の行方は分かっていない。

なお、なぜか資料上の性別が不安定で『サラブレッド血統書 第3巻』や『国営競馬統計 昭和28年』などでは牝馬と表記されている。

現在、天皇賞の第1回は日本競馬会による統一後の1937年「帝室御賞典（秋）」とされているため、マルタケの勝利が「父子3代天皇賞勝利」と称されることはない。それを初めて成し遂げたのは50年後の**メジロマックイーン**であり、奇しくも**オーエンス**と同じ**オーグメント**の牝系だった。
// ここはマルタケのとこでいいかも`
                },

              ],
            },
          ]
        },
        {
          name: 'キングフロラー',
          pedigree_name: '第十一コイワヰ',
          foaled: newDate(1923, 4, 8), // 『馬匹血統登録書 第1巻』p.90
          retired: '1932年秋季 年齢超過', // 『競馬成績書 昭和7年秋季』p.337
          sex: 'male',
          sire: 'コイワヰ',
          breeder: '小岩井農場（岩手県岩手郡雫石村）',
          color: '栗毛',
          result_sum: '16勝',
          result: '中央平地13勝 障害3勝',
          record: [
            { date: newDate(1928, 4, 29), race: '帝室御賞典（東京・春）', grade: 'empire_cup', result: 1 },
            { date: newDate(1928, 10, 14), race: '大禮記念（東京）', grade: 'empire_2m1f', result: 2 },
            { date: newDate(1928, 7, 29), race: '各内国産馬優勝（中山）', grade: 'empire_cs', result: 1 },
            { date: newDate(1928, 9, 23), race: '内国産古馬優勝（福島）', grade: 'empire_cs', result: 1 }, // 『中央獣医会雑誌 第41年(11)』p.1027
            { date: newDate(1929, 9, 29), race: '各内国産古馬優勝（福島）', grade: 'empire_cs', result: 1 }, // 『中央獣医会雑誌 第42年(12)』p.1087
            { date: newDate(1927, 11, 27), race: '新呼馬優勝（東京）', grade: 'empire_cs', result: 2 }, // 『競走馬の研究』p.133 『中央獣医会雑誌 41年(1)』p.72
          ],
          details:
            `
1923年に小岩井農場で誕生。両親ともに小岩井農場産という生粋の小岩井血統だった。デビューは4歳（旧5歳）になった1927年秋の東京とかなり遅い。翌年春には**エキスオン**・**ヘンペツキー**とそれぞれアタマ差クビ差の大接戦を演じ、その末に帝室御賞典（東京・春）の栄誉を勝ち取った。その後も勝利を重ね7歳までに13勝。障害に転向した8歳時にも3勝を挙げ、年齢制限となる10歳まで健康に走り続けた。また雨に強く、当時まことしやかに噂されていた「小岩井の馬は雨が苦手」という風説を打破した逸話が伝えられている。

10歳という高齢まで現役であったが、引退後には河西郡帯広町の六郎田武次の所有で「第十一コイワヰ」の名で種牡馬入り。のちに根室郡根室町・枳殻光次郎に購買され少なくとも1935年までは民間種牡馬を務め、いくらかの産駒を残したようである。

（戦績にある優勝戦の日付は「開催最終日」と仮定したものであり、不確実）`
        },
      ]
    },
    {
      name: 'フロリスカツプ',
      pedigree_name: '第三フロリースカツプ',
      foaled: newDate(1911, 4, 19),
      retired: '1915.05.06. 調教中に後蹄を前管下端にぶつけて管に罅裂が発生', // 「噫フロリスカツプ」
      died: '1933.08.18 斃死', // 『サラブレッド血統書 第1巻』p.441
      sex: 'female',
      sire: 'インフオーメーシヨン(GB)',
      breeder: '小岩井農場（岩手県岩手郡雫石村）',
      color: '鹿毛',
      result_sum: '（戦績詳細不明）',
      record: [
        { date: newDate(1914, 11, 8), race: '帝室御賞典（東京・秋）', grade: 'empire_cup', result: 9 }, // 『日本之産馬 4(12)』p.53
        { date: newDate(1915, 5, 2), race: '帝室御賞典（東京・春）', grade: 'empire_cup', result: 1 }, // 『日本之産馬 5(6)』p.31
      ],
      summary: '御賞典拝受と激動の五日間',
      details:
        `
旧4歳となった1914年の春、フロリスカツプは平出喜三郎（二代目）によって購入された。平出は函館競馬倶楽部の理事で、北海道函館区船見町（現在の函館市船見町）出身の政治家。実業家としても知られ、函館に平出農場を経営していた。函館に移ったフロリスカツプの調教を担当したのは続秀太郎。続は平出の義弟にして平出農場場長・調教師・騎手を兼任しており、1913年には**プレツチーポリー**に騎乗して帝室御賞典（東京・秋）を勝利していた。

同年秋には目黒競馬場に出場するも結果は芳しくなく、帝室御賞典（東京・秋）では**ハナビシ**の9着に敗れている。それでも更なる調教と成長を積んで翌1915年の春に再び上京。初日の内国産馬競走（1マイル）を差し切って勝利し、2日目の帝室御賞典（東京・春）に出走した。レースは7頭立て、初日の内国産新呼馬を勝った**ベストマン**と人気を分け合う形になる。発走前にはかなり入れ込む様子を見せていたが、スタートを決めて先頭に立つとそのままベストマンの追い込みを凌ぎ切り、3馬身差で逃げ切ってこのレースを制した。

この日、御賞典の賞品である銀製花盛器授与のために東伏見宮依仁親王が競馬場を訪れていた。戻った依仁親王の報告を受けた大正天皇は、詳しく聞くうちにフロリスカツプに興味を示した。大正天皇は以前より馬に通じていた上、ちょうど4月・5月の4日間で馬術の天覧（天皇直々の観覧）が行われていたこともあり、あれよあれよと話が進んでフロリスカツプの天覧が決まった。レースから僅か2日後、天覧馬術最終日の5月4日にフロリスカツプは吹上御苑で天皇と対面。関係者にとってはこれまでにない栄誉であっただろう。

それから2日後の5月6日早朝、目黒競馬場での調教騎乗中にそれは起こった。前足の管（かん、膝と球節の間の部分）に後ろ脚の蹄を誤ってぶつけてしまい亀裂骨折を発症、フロリスカツプの競走生活は思わぬ形で終わりを告げた。帝室御賞典の勝利から僅か5日目のことだった。

引退後は馬主の平出が所有する平出農場（北海道亀田郡湯の川村）で繁殖入り。1930年に事業に失敗した平出が牧場を手放し「湯ノ川牧場」と改称された後も繁殖生活を続け、1933年夏に旧23歳で死亡した。直後の9月に湯ノ川牧場は前川太郎兵衛らに譲渡。顧問を続けていた続もこれを機に湯ノ川を離れ、他の馬たちも手放された。なお、ラストクロップの**マークイス**はのちに帝室御賞典（東京・春）を母子制覇、牝系も2000年代まで続いた。`,
      citation: [
        'ワイ生「噫フロリスカツプ」『日本之産馬 5(6)』pp.44-46',
        '『中央獣医会雑誌 28(7)』p.41',
        '「イレネーを運んだ男 続秀太郎」『日本馬事協会 70年の歩み』pp.110-111',
        '「ヒラデエナモールド」『サラブレツド系統種牡馬名簿 第1巻』p.51',
        '「主禁」http://shukin.starfree.jp/BBS_LOG.htm'
      ],
      children: [
        {
          name: 'マークイス',
          pedigree_name: 'フロリス', // 『サラブレッド血統書 第1巻』p.442
          foaled: '1933',
          retired: '1939.02 乗用', // 『登録馬名簿 昭和14年2月』p.141
          sex: 'male',
          sire: 'ヒラデエナモールド',
          breeder: '前川牧場（北海道函館市旭岡）',
          color: '黒鹿毛',
          result_sum: '10勝', // 『登録馬名簿 昭和13年8月』 p.214 
          earnings: '30,100円', // 『登録馬名簿 昭和13年8月』 p.214
          record: [
            { date: newDate(1937, 4, 18), race: '帝室御賞典（東京・春）', grade: 'empire_cup', result: 1 },
            { date: newDate(1937, 11, 28), race: '目黒記念（秋）', grade: 'jrs_grade', result: 1 }, // 『競走馬の記録 昭和13 春版』pp.154-155
            { date: newDate(1937, 10, 30), race: '特ハン', grade: 'empire_cs', result: 1 }, // 『競走馬の記録 昭和13 春版』pp.154-155
            { date: newDate(1937, 11, 14), race: '優勝（横浜・秋）', grade: 'empire_cs', result: 1 }, // 『競走馬の記録 昭和13 春版』pp.154-155
            { date: newDate(1937, 11, 21), race: '特ハン', grade: 'empire_cs', result: 1 }, // 『競走馬の記録 昭和13 春版』pp.154-155
            { date: newDate(1938, 4, 2), race: '特ハン', grade: 'empire_cs', result: 2 }, // 『競走馬の記録 昭和13 秋版』p.155
          ],
          details:
            `
1933年に誕生。生産は函館の前川牧場となっているが、これは函館の湯ノ川牧場を1933年9月に譲り受けたもの。湯ノ川牧場の前身・平出農場を創設した平出喜三郎はマークイスの両親の所有者でもあるため、事実上湯ノ川牧場の産といってもいいだろう。

1936年の春に4歳でデビュー。本格化したのは翌年からで、まず春に帝室御賞典（東京・春）を勝利。日本競馬協会による統一前最後の帝室御賞典で、母第三フロリースカツプ（競走名**フロリスカツプ**）との母子制覇を達成した。秋には目黒記念（秋）を勝ったほか、特ハン2勝・優勝1回という好成績を残した。翌1938年は初戦の中山特ハンで2着となるも、そこから怪我で休養に入る。しかしその怪我が癒えることはなく、最終的に1937年いっぱいで引退を余儀なくされた。引退後は乗馬になったと記録されている。

また、上記の休養期間中にあたる1937年の6月～8月にオリンピックに向けた馬術候補選手の強化合宿が中山競馬場で行われ、その候補馬として本馬と**カブト**が日本国際馬術協会に譲渡されたという。これがマークイスの引退事由だったのかははっきりしないが、その夏以降マークイスが1度も出走しなかった事実とは矛盾しない。あるいは記録上の抹消理由「乗用」がそれを指すのかもしれない。`,
          citation: [
            '『競馬と馬券の實際知識 昭和13年度版』p.441',
          ]
        },
      ]
    },
    {
      name: '第四フロリースカツプ',
      foaled: newDate(1912, 4, 4),
      died: '1939.10.06. 斃死', // 『サラブレッド血統書 第1巻』p.442, 『サラブレッド系種牡馬名簿 第1巻』p.33
      sex: 'female',
      sire: 'インタグリオー(GB)',
      breeder: '小岩井農場（岩手県岩手郡雫石村）',
      color: '黒鹿毛',
      children: [
        {
          name: 'フロラーカツプ',
          pedigree_name: 'フロリスト',
          foaled: newDate(1919, 4, 27), // 『サラブレッド血統書 第1巻』p.438
          died: '1943.05.05. 死亡', // 血統書データサービス
          sex: 'female',
          sire: 'ガロン(GB)',
          breeder: '小岩井農場（岩手県岩手郡雫石村）',
          color: '栗毛',
          result_sum: '10勝', // 『競走馬の研究』p.24, 『競馬と馬券の實際知識 昭和13年度版』p.168
          earnings: '14,241円', // 『サラブレッド系種牡馬名簿 第1巻』p.148
          record: [
            { date: newDate(1923, 10, 18), race: '内国産新呼馬優勝（福島）', grade: 'empire_cs', result: 1 }, // 『報告書 大正12年度』p.105
            { date: newDate(1923, 11, 16), race: '帝室御賞典（東京・秋）', grade: 'empire_cup', result: 3 }, // 『報告書 大正12年度』p.34
            { date: newDate(1924, 5, 3), race: '優勝内国産馬連合競走（東京・春）', grade: 'empire_2mile', result: 1 }, // 『報告書 大正13年度 春季』p.20
            { date: newDate(1924, 5, 17), race: '福島市賞典・内国産馬特ハン', grade: 'empire_cs', result: 3 }, // 『報告書 大正13年度 春季』p.25
            { date: newDate(1924, 5, 25), race: '各内国産馬優勝（福島）', grade: 'empire_cs', result: 3 }, // 『報告書 大正13年度 春季』p.30
            { date: newDate(1924, 10, 11), race: '福島市賞典・各内産馬特ハン', grade: 'empire_cs', result: 1 }, // 『報告書 大正13年度』p.163
            { date: newDate(1924, 10, 19), race: '各内国産馬優勝（福島）', grade: 'empire_cs', result: 1 }, // 『報告書 大正13年度』p.169
            { date: newDate(1924, 11, 9), race: '各内国産馬優勝（日本）', grade: 'empire_cs', result: 2 }, // 『報告書 大正13年度』p.187
            { date: newDate(1924, 11, 16), race: '帝室御賞典（東京・秋）', grade: 'empire_cup', result: 1 }, // 『報告書 大正13年度』p.192
            { date: newDate(1924, 11, 23), race: '各内国産馬優勝（東京）', grade: 'empire_cs', result: 1 }, // 『報告書 大正13年度』p.197
          ],
          children: [
            {
              name: 'タマロツク',
              pedigree_name: '第貮フロリスト',
              foaled: newDate(1927, 4, 10),
              sex: 'female',
              sire: 'ラシカツター(GB)',
              breeder: '小岩井農場（岩手県岩手郡雫石村）',
              color: '栗毛',
              result_sum: '未出走',
              children: [
                {
                  name: 'フロリストモア',
                  pedigree_name: 'フロラヴアース',
                  foaled: newDate(1936, 3, 1),
                  sex: 'female',
                  sire: 'シアンモア(GB)',
                  breeder: '小岩井農場（岩手県岩手郡雫石村）',
                  color: '鹿毛',
                  result_sum: '6勝',
                  earnings: '10,770円以上',
                },
              ]
            },
            {
              name: 'ハクリユウ',
              former_pedigree_name: '第貮ラシデヤー',
              foaled: newDate(1928, 4, 24),
              sex: 'male',
              sire: 'ラシデヤー',
              breeder: '小岩井農場（岩手県岩手郡雫石村）',
              color: '栗毛',
              result_sum: '31戦13勝',
              result: '中央平地',
              earnings: '54,560円', // 全戦績の出典は「セピアの館」https://www5a.biglobe.ne.jp/~qq_sepia/uma/hakuryuu.htm
              record: [
                { date: newDate(1931, 9, 18), race: '特ハン', grade: 'empire_cs', result: 10 },
                { date: newDate(1931, 10, 25), race: '帝室御賞典（横浜・秋）', grade: 'empire_cup', result: 2 },
                { date: newDate(1931, 11, 3), race: '横浜特別（秋）', grade: 'empire_grade', result: 1 },
                { date: newDate(1931, 11, 14), race: '特ハン', grade: 'empire_cs', result: 1 },
                { date: newDate(1931, 11, 15), race: '帝室御賞典（東京・秋）', grade: 'empire_cup', result: 1 },
                { date: newDate(1931, 11, 22), race: '各内国産古馬連合（東京・秋）', grade: 'empire_2mile', result: 1 },
                { date: newDate(1931, 12, 6), race: '古呼馬優勝（京都）', grade: 'empire_cs', result: 2 },
                { date: newDate(1932, 3, 26), race: '特ハン', grade: 'empire_cs', result: 1 },
                { date: newDate(1932, 3, 27), race: '中山四千米', grade: 'empire_grade', result: 1 },
                { date: newDate(1932, 4, 16), race: '特ハン', grade: 'empire_cs', result: 2 },
                { date: newDate(1932, 4, 18), race: '目黒記念（春）', grade: 'empire_grade', result: 1 },
                { date: newDate(1932, 5, 22), race: '優勝呼馬（横浜）', grade: 'empire_cs', result: 3 },
              ],
            },
            {
              name: 'ハクセツ',
              id_name: 'ハクセツ_1929',
              former_pedigree_name: '第四シアンモア', // 『馬匹血統登録書 第11巻』p.450
              foaled: newDate(1929, 4, 1), // 『サラブレッド系種牡馬名簿 第1巻』p.33
              retired: '1934年春季 繁殖',
              sex: 'male',
              sire: 'シアンモア(GB)',
              breeder: '小岩井農場（岩手県岩手郡雫石村）',
              color: '鹿毛',
              result_sum: '27戦13勝',
              result: '中央平地',
              earnings: '71,661円', // 『サラブレッド系種牡馬名簿 第1巻』p.34
              record: [
                { date: newDate(1932, 4, 24), race: '東京優駿大競走', grade: 'empire_derby', result: 6 },
                { date: newDate(1932, 10, 17), race: '呼馬優勝（横浜）', grade: 'empire_cs', result: 2 },
                { date: newDate(1932, 10, 22), race: '内国産古馬特ハン', grade: 'empire_cs', result: 1 },
                { date: newDate(1932, 10, 30), race: '農林省賞典（東京・秋）', grade: 'empire_2mile', result: 2 },
                { date: newDate(1932, 11, 3), race: '内国産古馬優勝', grade: 'empire_cs', result: 1 },
                { date: newDate(1932, 11, 12), race: '農林省賞典（阪神・秋）', grade: 'empire_2mile', result: 1 },
                { date: newDate(1933, 3, 26), race: '中山春季五歳馬特別', grade: 'empire_grade', result: 2 },
                { date: newDate(1933, 4, 15), race: '各古馬特ハン（東京）', grade: 'empire_cs', result: 4 },
                { date: newDate(1933, 4, 17), race: '目黒記念（春）', grade: 'empire_grade', result: 3 },
                { date: newDate(1933, 5, 7), race: '帝室御賞典（横浜・春）', grade: 'empire_cup', result: 2 },
                { date: newDate(1933, 5, 14), race: '横浜特別（春）', grade: 'empire_grade', result: 2 },
                { date: newDate(1933, 10, 7), race: 'オールカマーハンデ', grade: 'empire_grade', result: 1 },
                { date: newDate(1933, 10, 8), race: '帝室御賞典（横浜・秋）', grade: 'empire_cup', result: 1 },
                { date: newDate(1933, 10, 15), race: '横浜特別（秋）', grade: 'empire_grade', result: 1 },
                { date: newDate(1933, 10, 28), race: '古呼馬特ハン（中山）', grade: 'empire_cs', result: 1 },
                { date: newDate(1933, 11, 5), race: '中山秋季五歳馬特別', grade: 'empire_grade', result: 3 },
                { date: newDate(1933, 11, 11), race: '呼馬優勝', grade: 'empire_cs', result: 4 },
                { date: newDate(1933, 11, 20), race: '目黒記念（秋）', grade: 'empire_grade', result: 1 },
                { date: newDate(1933, 11, 25), race: '五歳馬特別（東京・秋）', grade: 'empire_grade', result: 1 },
                { date: newDate(1934, 3, 24), race: '古呼馬特ハン（中山）', grade: 'empire_cs', result: 7 },
                { date: newDate(1934, 4, 3), race: '中山四千米', grade: 'empire_grade', result: 1 },
              ],
              summary: '五歳秋に覚醒した晩成の名馬',
              details: `
1929年に小岩井農場で誕生。父は名種牡馬**シアンモア**、母は牡馬相手に連合二哩と帝室御賞典を勝った**フロリスト**という超名血のもとに生まれた。さらにはデビュー直前の1931年秋、1歳上の半兄・**ハクリユウ**が連合二哩と帝室御賞典を連勝。ハクセツにかかる期待の大きさは想像に難くない。

果たして1932年の春にデビューし、中山の新呼馬で3着。東京で迎えた2戦目は**ワカタカ**に10馬身差をつけられての2着となる。3戦目には第一回東京優駿大競走（後の日本ダービー）に出走、4番人気6着と再び**ワカタカ**の前に敗れた。その後は休養して未勝利のまま秋開催を迎える。秋は横浜（日本レース倶楽部）で始動、初戦を1着で飾りこれが初勝利となる。東京では特ハンに斤量52kgで出走すると、同期の名牝**シラヌヒ**を破って優勝。余勢を駆って挑んだ農林省賞典（連合二哩）では再び**ワカタカ**に敗れて2着となったが、続く各古馬優勝戦で**アスコツト**・**ロビンオー**らを下して初優勝を果たした。次週は阪神に遠征し農林省賞典に出走。堂々の一番人気に推される中、雨上がりの不良馬場をレコードタイムで駆け抜けた。2着**アサヤス**に大差をつける圧勝だった。

5歳になった1933年、初戦の中山春季五歳馬特別は**ゼンソ**の2着。平場と呼馬優勝を勝利し、春の中山で2度目の優勝を果たす。しかしそれからは特ハン4着、目黒記念（春）3着、帝室御賞典（横浜・春）2着、横浜特別（春）2着と勝ちきれない競馬が続いた。相手には同期の葦毛馬**ハクコウ**とダービー馬**ワカタカ**、4月に中山四千米を勝って調子を上げてきた**アスコツト**が立ちはだかっていた。

秋になり、ハクセツの鞍上は石毛彦次郞から田中和一郎に再度乗り替わり。秋初戦に横浜の名物競走・オールカマーハンデキヤツプを選ぶとこれを圧勝し、さらに帝室御賞典（横浜・秋）、横浜特別（秋）、古呼馬特ハン（コースレコード）と怒涛の4連勝を飾る。ハクコウとワカタカへのリベンジも果たした。続く中山秋季五歳馬特別ではハクコウの3着、呼馬優勝ではワカタカの4着に敗れるも、東京に替わって目黒記念（秋）と五歳馬特別（秋）を連勝。この秋シーズンだけで8戦6勝（うち特別競走5勝）、28.755円を稼ぎあげる大活躍だった。

翌年も現役を続行するも、中山の特ハンで72kgという酷量を背負って最下位7着に惨敗してしまう。これが契機となってかハクセツはこの春限りでの引退を決定。ラストランの中山四千米では単勝支持率62.3%、単勝1.35倍の1番人気に応えて4馬身差で優勝。有終の美を飾ってターフを去った。

引退後は北海道沙流郡門別村の羽田牧場で種牡馬入り。種付け数は伸びず産駒から活躍馬は出なかった。昭和15年にマルタケ牧場に改称された際も、既に種付け数は0ながら引き続き繋養されたと伝わるがその後についてはわかっていない。`
            },
            {
              name: 'スターカツプ',
              foaled: newDate(1930, 3, 30),
              sex: 'female',
              sire: 'シアンモア(GB)',
              breeder: '小岩井農場（岩手県岩手郡雫石村）',
              color: '鹿毛',
              result_sum: '22戦12勝',
              result: '中央平地',
              earnings: '44,500円（本賞金のみ）',
              record: [
                { date: newDate(1933, 10, 7), race: '新呼馬優勝（阪神・秋）', grade: 'empire_cs', result: 1 },
                { date: newDate(1933, 11, 5), race: '古呼馬優勝（小倉・秋）', grade: 'empire_cs', result: 1 },
                { date: newDate(1933, 12, 25), race: '古呼馬優勝（京都・秋）', grade: 'empire_cs', result: 2 },
                { date: newDate(1934, 1, 7), race: '帝室御賞典（阪神・春）', grade: 'empire_cup', result: 2 },
                { date: newDate(1934, 1, 14), race: '農林省賞典（阪神・春）', grade: 'empire_2mile', result: 1 },
                { date: newDate(1934, 4, 1), race: '古呼馬特ハン', grade: 'empire_cs', result: 1 },
                { date: newDate(1934, 4, 3), race: '牝馬連合', grade: 'empire_2mile', result: 3 },
                { date: newDate(1934, 4, 15), race: '古呼馬優勝（京都・春）', grade: 'empire_cs', result: 1 },
                { date: newDate(1934, 5, 18), race: '古呼馬特ハン', grade: 'empire_cs', result: 1 },
                { date: newDate(1934, 5, 20), race: '帝室御賞典（小倉・春）', grade: 'empire_cup', result: 1 },
                { date: newDate(1934, 11, 23), race: '古呼馬特ハン', grade: 'empire_cs', result: 6 },
                { date: newDate(1934, 12, 9), race: '古呼馬優勝（京都・秋）', grade: 'empire_cs', result: 2 },
                { date: newDate(1934, 12, 14), race: '各古馬特ハン', grade: 'empire_cs', result: 5 },
              ],
            },
            {
              name: 'アカイシダケ',
              former_pedigree_name: '第拾五シアンモア',
              foaled: newDate(1932, 2, 17),
              sex: 'male',
              sire: 'シアンモア(GB)',
              breeder: '小岩井農場（岩手県岩手郡雫石村）',
              color: '鹿毛',
              result_sum: '27戦11勝',
              result: '中央平地',
              earnings: '64,742.5円', // 『サラブレッド系種牡馬名簿 第1巻』p.148
              record: [
                { date: newDate(1935, 4, 29), race: '東京優駿大競走', grade: 'empire_derby', result: 2 },
                { date: newDate(1935, 5, 5), race: '新呼馬優勝（東京・春）', grade: 'empire_cs', result: 1 },
                { date: newDate(1935, 5, 12), race: '帝室御賞典（横浜・春）', grade: 'empire_cup', result: 2 },
                { date: newDate(1935, 10, 12), race: '古呼馬特ハン', grade: 'empire_cs', result: 2 },
                { date: newDate(1935, 10, 17), race: '中山四歳馬特別', grade: 'empire_grade', result: 2 },
                { date: newDate(1935, 10, 27), race: '呼馬優勝（中山・秋）', grade: 'empire_cs', result: 1 },
                { date: newDate(1935, 11, 2), race: 'オールカマーハンデ（秋）', grade: 'empire_grade', result: 5 },
                { date: newDate(1935, 11, 3), race: '帝室御賞典（横浜・秋）', grade: 'empire_cup', result: 1 },
                { date: newDate(1935, 11, 17), race: '呼馬優勝（横浜・秋）', grade: 'empire_cs', result: 1 },
                { date: newDate(1935, 11, 25), race: '目黒記念（秋）', grade: 'empire_grade', result: 1 },
                { date: newDate(1935, 12, 6), race: '農林省賞典（東京・秋）', grade: 'empire_2mile', result: 1 },
                { date: newDate(1936, 4, 3), race: '中山四千米', grade: 'empire_grade', result: 1 },
                { date: newDate(1936, 4, 18), race: '各古馬特ハン', grade: 'empire_cs', result: 2 },
                { date: newDate(1936, 4, 25), race: '目黒記念（春）', grade: 'empire_grade', result: 3 },
                { date: newDate(1936, 5, 9), race: 'オールカマーハンデ（春）', grade: 'empire_grade', result: 6 },
                { date: newDate(1936, 5, 17), race: '横浜特別（春）', grade: 'empire_grade', result: 2 },
                { date: newDate(1936, 10, 10), race: '古呼馬特ハン', grade: 'empire_cs', result: 4 },
                { date: newDate(1936, 11, 8), race: '横浜特別（秋）', grade: 'empire_grade', result: 4 },
                { date: newDate(1936, 11, 23), race: '目黒記念（秋）', grade: 'empire_grade', result: 4 },
                { date: newDate(1936, 11, 29), race: '五歳馬特別（秋）', grade: 'empire_grade', result: 8 },
              ],
            },
          ]
        },
      ]
    },
  ]
} as const satisfies Horse

export default FLORRIES_CUP