import { NextRequest, NextResponse } from 'next/server';
import { appendToLog } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { mode, messages } = await request.json();
    
    // コンソールメッセージをアプリケーションログに追記
    await appendToLog(mode, 'app', 'Layout console messages logged', {
      consoleMessages: messages
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log console messages:', error);
    return NextResponse.json(
      { error: 'Failed to log console messages' },
      { status: 500 }
    );
  }
} 