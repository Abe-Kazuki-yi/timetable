import "./globals.css";
import { Inconsolata } from 'next/font/google'
import type { ReactNode } from "react";
import Test from "@/components/Test";

//Googleフォントを有効化
const font = Inconsolata({ subsets: ['latin']});

//メタデータを定義
export const metadata ={
  title: 'timetable manager',
  description: '生徒と教師で授業をマッチングするためのアプリ',
}

export default function RootLayout({ children }: { children: ReactNode }){
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