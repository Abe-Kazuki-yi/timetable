import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { mode } = await request.json();
    
    // .env.development.localファイルの作成/削除
    const envLocalPath = path.resolve(process.cwd(), '.env.development.local');
    
    if (mode === 'test') {
      // テストモード: .env.development.localファイルを作成
      const content = 'NEXT_PUBLIC_TEST_MODE=test\n';
      fs.writeFileSync(envLocalPath, content);
      console.log('Created .env.development.local with test mode');
    } else {
      // 通常モード: .env.development.localファイルを削除
      if (fs.existsSync(envLocalPath)) {
        fs.unlinkSync(envLocalPath);
        console.log('Removed .env.development.local');
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      mode: mode,
      message: `Mode changed to ${mode}` 
    });
  } catch (error) {
    console.error('Failed to change mode:', error);
    return NextResponse.json(
      { error: 'Failed to change mode' },
      { status: 500 }
    );
  }
} 