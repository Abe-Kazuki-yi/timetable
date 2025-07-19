import { NextResponse } from 'next/server';

export async function GET() {
  // サーバーサイドで環境変数を取得
  const envVars = {
    NEXT_PUBLIC_TEST_MODE: process.env.NEXT_PUBLIC_TEST_MODE || 'default'
  };
  
  return NextResponse.json(envVars);
} 