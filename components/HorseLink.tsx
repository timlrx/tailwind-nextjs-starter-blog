'use client';

import NameList from "@/pedigree/HorseList";
import React from 'react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

interface LinkProps {
  name: string;
}

const HorseLink: React.FC<LinkProps> = ({ name }) => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行される
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname); // パスをセット
    }
  }, []);
  // Anchors のキーをループし、該当するページとIDを見つける
  const result = NameList.get(name);

  if (!result) {
    return (
      <span className="font-medium">{name}</span>
    )
  }

  // 現在のページと一致する場合、ページ内リンクを生成
  if (currentPath && currentPath.includes(result.family)) {
    return <a href={`#${result.link}`}>{result.name}</a>;
  }

  // 他ページへのリンクを生成
  return (
    <NextLink href={`/family/${result.family}#${result.link}`}>
      {result.name}
    </NextLink>
  );
};


export default HorseLink;
