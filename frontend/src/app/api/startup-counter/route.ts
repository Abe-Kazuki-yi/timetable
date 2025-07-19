import { NextRequest, NextResponse } from 'next/server';
import { recordStartup } from '@/utils/startupCounter';
import { appendToLog } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { mode } = await request.json();
    
    console.log(`API startup-counter called with mode: ${mode}`);
    
    // サーバー起動回数を記録
    const result = await recordStartup(mode);
    
    // アプリケーションログに追記
    const logMessages = [
      `API startup-counter called with mode: ${mode}`,
      `Server started ${result.totalStartups} times.`,
      `Server counter updated: ${result.serverCounter}`,
      `xTestId from config: ${result.xTestId}`,
      'API startup-counter completed successfully'
    ];
    
    await appendToLog(mode, 'app', 'Server startup process completed', {
      xTestId: result.xTestId,
      serverCounter: result.serverCounter,
      totalStartups: result.totalStartups,
      consoleMessages: logMessages
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Startup counter error:', error);
    return NextResponse.json(
      { error: 'Failed to record startup' },
      { status: 500 }
    );
  }
} 