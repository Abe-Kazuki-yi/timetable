import fs from 'fs';
import path from 'path';
import { writeLog } from './logger';

const filePath = path.resolve(process.cwd(), 'startup.json');
const configFilePath = path.resolve(process.cwd(), 'public/data/testConfig.json');

interface TestConfig {
  xTestId: string;
  serverCounter: number;
}

export const recordStartup = (mode: string = 'default') => {
  const consoleMessages: string[] = [];
  
  try {
    // 起動回数の記録
    let data = { count: 0 };

    if (fs.existsSync(filePath)) {
      const json = fs.readFileSync(filePath, 'utf-8');
      data = JSON.parse(json);
    }

    data.count += 1;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    const startupMessage = `Server started ${data.count} times.`;
    console.log(startupMessage);
    consoleMessages.push(startupMessage);

    // testConfig.jsonの読み取りと更新
    if (fs.existsSync(configFilePath)) {
      const configJson = fs.readFileSync(configFilePath, 'utf-8');
      const config: TestConfig = JSON.parse(configJson);
      
      // serverCounterを更新
      config.serverCounter += 1;
      
      // 更新されたconfigをファイルに保存
      fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
      
      const counterMessage = `Server counter updated: ${config.serverCounter}`;
      const xTestIdMessage = `xTestId from config: ${config.xTestId}`;
      
      console.log(counterMessage);
      console.log(xTestIdMessage);
      consoleMessages.push(counterMessage);
      consoleMessages.push(xTestIdMessage);
      
      return {
        xTestId: config.xTestId,
        serverCounter: config.serverCounter,
        consoleMessages: consoleMessages,
        totalStartups: data.count
      };
    } else {
      const warningMessage = 'testConfig.json not found';
      console.warn(warningMessage);
      consoleMessages.push(`WARNING: ${warningMessage}`);
      
      return {
        xTestId: '',
        serverCounter: 0,
        consoleMessages: consoleMessages,
        totalStartups: data.count
      };
    }
  } catch (err) {
    const errorMessage = 'Failed to record startup or load config';
    console.error(errorMessage, err);
    consoleMessages.push(errorMessage);
    consoleMessages.push(err instanceof Error ? err.message : 'Unknown error');
    
    return {
      xTestId: '',
      serverCounter: 0,
      consoleMessages: consoleMessages,
      error: err instanceof Error ? err.message : 'Unknown error'
    };
  }
};
