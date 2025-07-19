'use client'

import "./globals.css";
import { Inconsolata } from 'next/font/google'
import type { ReactNode } from "react";
import Test from "@/components/test";
import { useEffect } from 'react';
import useConfigStore from '@/store/confingStore';

//Googleフォントを有効化
const font = Inconsolata({ subsets: ['latin']});

export default function RootLayout({ children }: { children: ReactNode }){

const setConfig = useConfigStore((state) => state.setConfig);

  useEffect(() => {
    // 環境変数を Store に保存
    setConfig({
      xTestId: process.env.NEXT_PUBLIC_DEFAULT_TEST_ID || '',
    });
  }, [setConfig]);

  return (

<html lang="ja">
<body className={font.className}>
  <h1>TimeTable Manager</h1>
  {/* 共通メニューの準備 */}
  <p>ここは共通メニューです</p>
  {/* ページコンポーネントを反映する領域 */}
  <Test />
  <div className="ml-2">
    {children}
  </div>
</body>
</html>

  );
}