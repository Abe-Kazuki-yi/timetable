import { NextRequest, NextResponse } from 'next/server';
import { writeAppLog } from '@/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { mode, message, additionalData } = await request.json();
    
    // アプリケーションログを記録
    writeAppLog(mode, message, additionalData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to write app log:', error);
    return NextResponse.json(
      { error: 'Failed to write app log' },
      { status: 500 }
    );
  }
} 