import { NextRequest, NextResponse } from 'next/server';
import { appendToLog } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { mode, startupMessages } = await request.json();
    
    // Next.jsの起動ログを追記
    await appendToLog(mode, 'startup', 'Next.js startup process', {
      consoleMessages: startupMessages
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to write startup log:', error);
    return NextResponse.json(
      { error: 'Failed to write startup log' },
      { status: 500 }
    );
  }
} 