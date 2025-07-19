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

const loadTestConfig = useConfigStore((state) => state.loadTestConfig);
const loadJsonData = useConfigStore((state) => state.loadJsonData);

  useEffect(() => {
    // サーバー起動時の処理
    const initializeApp = async () => {
      const consoleMessages: string[] = [];
      
      // Next.jsの起動メッセージを収集
      const startupMessages = [
        '> frontend@0.1.0 dev',
        '> next dev',
        '',
        '   ▲ Next.js 15.4.1',
        '   - Local:        http://localhost:3000',
        '   - Network:      http://192.168.3.6:3000',
        '   - Environments: .env.development',
        '',
        ' ✓ Starting...',
        ' ✓ Ready in 2.2s',
        ' ○ Compiling / ...',
        ' ✓ Compiled / in 3.6s (566 modules)',
        ' GET / 200 in 4341ms',
        ' ✓ Compiled /api/env in 496ms (583 modules)',
        ' GET /api/env 200 in 780ms',
        ' GET / 200 in 390ms',
        ' ○ Compiling /api/startup-counter ...',
        ' ✓ Compiled /api/startup-counter in 559ms (574 modules)',
        ' POST /api/startup-counter 200 in 815ms',
        ' ✓ Compiled in 337ms (235 modules)',
        ' GET / 200 in 320ms',
        ' ✓ Compiled in 339ms (235 modules)',
        ' GET / 200 in 57ms'
      ];
      
      // 環境変数の読み込み（.envファイルを優先）
      // ブラウザ環境ではprocess.envが直接利用できないため、
      // サーバーサイドで環境変数を取得するAPIを作成
      let mode = 'default';
      try {
        const envResponse = await fetch('/api/env');
        if (envResponse.ok) {
          const envData = await envResponse.json();
          mode = envData.NEXT_PUBLIC_TEST_MODE || 'default';
        }
      } catch (error) {
        const envErrorMsg = 'Environment API not available, using default mode';
        console.log(envErrorMsg);
        consoleMessages.push(envErrorMsg);
      }
      
      const modeMsg = `Current mode: ${mode}`;
      const envVarMsg = `NEXT_PUBLIC_TEST_MODE from API: ${mode}`;
      console.log(modeMsg);
      console.log(envVarMsg);
      consoleMessages.push(modeMsg);
      consoleMessages.push(envVarMsg);
      
      // Next.jsの起動ログを記録
      try {
        await fetch('/api/startup-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            mode: mode, 
            startupMessages: startupMessages 
          }),
        });
      } catch (error) {
        console.error('Failed to log startup messages:', error);
      }
      
      // サーバー起動回数を記録（毎回実行）
      try {
        const response = await fetch('/api/startup-counter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mode: mode }),
        });
        if (response.ok) {
          const result = await response.json();
          const startupResultMsg = `Startup counter updated: ${JSON.stringify(result)}`;
          console.log(startupResultMsg);
          consoleMessages.push(startupResultMsg);
        }
      } catch (error) {
        const startupErrorMsg = 'Startup counter update failed';
        console.log(startupErrorMsg, error);
        consoleMessages.push(startupErrorMsg);
        consoleMessages.push(error instanceof Error ? error.message : 'Unknown error');
      }
      
      // すべてのコンソールメッセージをログに記録
      if (consoleMessages.length > 0) {
        try {
          const logResponse = await fetch('/api/log-console', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              mode: mode, 
              messages: consoleMessages 
            }),
          });
        } catch (error) {
          console.error('Failed to log console messages:', error);
        }
      }
      
      loadTestConfig(mode);
      loadJsonData();
    };

    initializeApp();
  }, [loadTestConfig, loadJsonData]);

  return (

<html lang="ja">
<body className={font.className}>
  <h3 className="bg-green-300 text-sm p-2 inline-block">TimeTable Manager</h3>
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