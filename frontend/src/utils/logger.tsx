import fs from 'fs';
import path from 'path';

interface LogEntry {
  timestamp: string;
  mode: string;
  message: string;
  xTestId?: string;
  serverCounter?: number;
  consoleMessages?: string[];
}

interface AdditionalData {
  xTestId?: string;
  serverCounter?: number;
  [key: string]: unknown;
}

// モード名を正規化する関数
const normalizeMode = (mode: string): string => {
  return mode.trim().toLowerCase();
};

// ログベースパスを設定（環境変数から取得可能）
const getLogBasePath = () => {
  // 環境変数からログパスを取得、なければデフォルトを使用
  const customLogPath = process.env.LOG_BASE_PATH;
  if (customLogPath && fs.existsSync(customLogPath)) {
    return customLogPath;
  }
  
  // 既存のlogsディレクトリを確認
  const defaultLogPath = path.resolve(process.cwd(), 'logs');
  if (fs.existsSync(defaultLogPath)) {
    return defaultLogPath;
  }
  
  // プロジェクトルートのlogsディレクトリを確認
  const projectLogPath = path.resolve(process.cwd(), '..', 'logs');
  if (fs.existsSync(projectLogPath)) {
    return projectLogPath;
  }
  
  // デフォルトパスを返す
  return defaultLogPath;
};

export const createLogDirectory = (mode: string) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const logBasePath = getLogBasePath();
    const startupPath = path.resolve(logBasePath, 'startup');
    const modePath = path.resolve(startupPath, normalizedMode);
    
    // ログディレクトリを作成（存在しない場合のみ）
    if (!fs.existsSync(logBasePath)) {
      fs.mkdirSync(logBasePath, { recursive: true });
      console.log(`Created log base directory: ${logBasePath}`);
    } else {
      console.log(`Using existing log directory: ${logBasePath}`);
    }
    
    if (!fs.existsSync(startupPath)) {
      fs.mkdirSync(startupPath, { recursive: true });
      console.log(`Created startup log directory: ${startupPath}`);
    } else {
      console.log(`Using existing startup log directory: ${startupPath}`);
    }
    
    if (!fs.existsSync(modePath)) {
      fs.mkdirSync(modePath, { recursive: true });
      console.log(`Created mode log directory: ${modePath}`);
    } else {
      console.log(`Using existing mode log directory: ${modePath}`);
    }
    
    return modePath;
  } catch (error) {
    console.error('Failed to create log directory:', error);
    return null;
  }
};

export const writeLog = (mode: string, message: string, additionalData?: AdditionalData) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const modePath = createLogDirectory(normalizedMode);
    if (!modePath) return;
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const timestamp = `${dateStr}_${timeStr}`;
    
    const logEntry: LogEntry = {
      timestamp: `${dateStr} ${timeStr}`,
      mode: normalizedMode,
      message: message,
      ...additionalData
    };
    
    const logFileName = `${dateStr}_${timeStr.replace(/:/g, '-')}.log`;
    const logFilePath = path.resolve(modePath, logFileName);
    
    const logContent = JSON.stringify(logEntry, null, 2) + '\n';
    fs.writeFileSync(logFilePath, logContent);
    
    console.log(`Log written: ${logFilePath}`);
  } catch (error) {
    console.error('Failed to write log:', error);
  }
};

// Next.jsの起動ログを記録する関数
export const writeStartupLog = (mode: string, startupMessages: string[]) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const modePath = createLogDirectory(normalizedMode);
    if (!modePath) return;
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    
    const logEntry: LogEntry = {
      timestamp: `${dateStr} ${timeStr}`,
      mode: normalizedMode,
      message: 'Next.js startup process',
      consoleMessages: startupMessages
    };
    
    const logFileName = `${dateStr}_startup.log`;
    const logFilePath = path.resolve(modePath, logFileName);
    
    const logContent = JSON.stringify(logEntry, null, 2) + '\n';
    fs.writeFileSync(logFilePath, logContent);
    
    console.log(`Startup log written: ${logFilePath}`);
  } catch (error) {
    console.error('Failed to write startup log:', error);
  }
};

// アプリケーションログを記録する関数
export const writeAppLog = (mode: string, message: string, additionalData?: AdditionalData) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const modePath = createLogDirectory(normalizedMode);
    if (!modePath) return;
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    
    const logEntry: LogEntry = {
      timestamp: `${dateStr} ${timeStr}`,
      mode: normalizedMode,
      message: message,
      ...additionalData
    };
    
    const logFileName = `${dateStr}_app.log`;
    const logFilePath = path.resolve(modePath, logFileName);
    
    const logContent = JSON.stringify(logEntry, null, 2) + '\n';
    fs.writeFileSync(logFilePath, logContent);
    
    console.log(`App log written: ${logFilePath}`);
  } catch (error) {
    console.error('Failed to write app log:', error);
  }
};

export const getCurrentLogs = (mode: string) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const logBasePath = getLogBasePath();
    const modePath = path.resolve(logBasePath, 'startup', normalizedMode);
    if (!fs.existsSync(modePath)) {
      return [];
    }
    
    const files = fs.readdirSync(modePath);
    const logs = files
      .filter(file => file.endsWith('.log'))
      .map(file => {
        const filePath = path.resolve(modePath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return logs;
  } catch (error) {
    console.error('Failed to get current logs:', error);
    return [];
  }
};

// 既存のログディレクトリを確認する関数
export const checkExistingLogDirectories = () => {
  const possiblePaths = [
    path.resolve(process.cwd(), 'logs'),
    path.resolve(process.cwd(), '..', 'logs'),
    path.resolve(process.cwd(), '..', '..', 'logs'),
    process.env.LOG_BASE_PATH
  ].filter((path): path is string => Boolean(path));
  
  const existingPaths = possiblePaths.filter(path => fs.existsSync(path));
  
  console.log('Checking existing log directories:');
  possiblePaths.forEach(path => {
    if (fs.existsSync(path)) {
      console.log(`✓ Found: ${path}`);
    } else {
      console.log(`✗ Not found: ${path}`);
    }
  });
  
  return existingPaths;
}; 

// 統合ログを記録する関数
export const writeUnifiedLog = (mode: string, allMessages: string[], additionalData?: AdditionalData) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const modePath = createLogDirectory(normalizedMode);
    if (!modePath) return;
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    
    const logEntry: LogEntry = {
      timestamp: `${dateStr} ${timeStr}`,
      mode: normalizedMode,
      message: 'Complete startup process log',
      consoleMessages: allMessages,
      ...additionalData
    };
    
    const logFileName = `${dateStr}_unified.log`;
    const logFilePath = path.resolve(modePath, logFileName);
    
    const logContent = JSON.stringify(logEntry, null, 2) + '\n';
    fs.writeFileSync(logFilePath, logContent);
    
    console.log(`Unified log written: ${logFilePath}`);
  } catch (error) {
    console.error('Failed to write unified log:', error);
  }
};

// 同じファイルに追記する関数
export const appendToLog = (mode: string, logType: 'startup' | 'app', message: string, additionalData?: AdditionalData) => {
  try {
    const normalizedMode = normalizeMode(mode);
    const modePath = createLogDirectory(normalizedMode);
    if (!modePath) return;
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0]; // HH:MM:SS
    
    const logEntry: LogEntry = {
      timestamp: `${dateStr} ${timeStr}`,
      mode: normalizedMode,
      message: message,
      ...additionalData
    };
    
    const logFileName = `${dateStr}_${logType}.log`;
    const logFilePath = path.resolve(modePath, logFileName);
    
    const logContent = JSON.stringify(logEntry, null, 2) + '\n';
    
    // ファイルが存在する場合は追記、存在しない場合は新規作成
    if (fs.existsSync(logFilePath)) {
      fs.appendFileSync(logFilePath, logContent);
    } else {
      fs.writeFileSync(logFilePath, logContent);
    }
    
    console.log(`Log appended to: ${logFilePath}`);
  } catch (error) {
    console.error('Failed to append to log:', error);
  }
}; 