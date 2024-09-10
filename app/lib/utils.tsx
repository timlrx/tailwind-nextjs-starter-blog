// Dateコンストラクタ代用
export const newDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month - 1, day);
}

// 年を取り出す
export const yearOf = (foaled: string | Date) => {
  if (foaled instanceof Date) {
    // Date型の場合は年を返す
    return foaled.getFullYear()
  } else if (!isNaN(Number(foaled))) {
    // 年のみの文字列の場合はNumber型に変換
    return Number(foaled)
  } else {
    // それ以外の場合はそのまま返す
    return foaled
  }
}

// 文字列をDate型に変換
export const toDate = (date: string | Date): Date => {
  if (date instanceof Date) {
    return date
  } else if (!isNaN(Number(date))) {
    return newDate(Number(date), 1, 1)
  } else {
    return newDate(0, 1, 1)
  }
}

// 日付を比較 
export const compareDate = (a: string | Date, b: string | Date): number => {
  // 両方とも非数値文字列の場合は順序を維持する
  if (typeof yearOf(a) === 'string' && typeof yearOf(b) === 'string') {
    return 0;
  }
  return toDate(a) > toDate(b) ? 1 : -1
}


