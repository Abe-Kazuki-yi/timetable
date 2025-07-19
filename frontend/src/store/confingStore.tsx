import { create } from 'zustand';

interface JsonData {
  appName: string;
  version: string;
  defaultSettings: {
    theme: string;
    language: string;
    timezone: string;
  };
  features: {
    timetable: boolean;
    calendar: boolean;
    notifications: boolean;
  };
}

interface TestConfig {
  xTestId: string;
  serverCounter: number;
}

interface ConfigState {
  xTestId: string;
  serverCounter: number;
  jsonData: JsonData | null;
  setConfig: (config: Partial<ConfigState>) => void;
  loadJsonData: () => Promise<void>;
  loadTestConfig: (mode?: string) => Promise<void>;
  setManualTestId: (testId: string) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
  xTestId: '',
  serverCounter: 0,
  jsonData: null,
  setConfig: (config) => set(config),
  loadJsonData: async () => {
    try {
      const response = await fetch('/data/config.json');
      const data: JsonData = await response.json();
      set({ jsonData: data });
      console.log('JSON data loaded successfully');
    } catch (error) {
      console.error('JSONファイルの読み込みに失敗しました:', error);
    }
  },
  loadTestConfig: async (mode = 'default') => {
    try {
      const response = await fetch('/data/testConfig.json');
      const data: TestConfig = await response.json();
      
      if (mode === 'test') {
        // testモードの場合のみ、手動入力を受け付ける
        const manualTestId = prompt('Testモードです。xTestIdを入力してください:');
        const finalTestId = manualTestId || data.xTestId;
        
        set({ 
          xTestId: finalTestId,
          serverCounter: data.serverCounter 
        });
        const testModeMsg = `Test mode: Manual xTestId set to: ${finalTestId}`;
        console.log(testModeMsg);
        
        // ログに記録
        try {
          await fetch('/api/log-console', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              mode: mode, 
              messages: [testModeMsg] 
            }),
          });
        } catch (error) {
          console.error('Failed to log test mode message:', error);
        }
      } else {
        // デフォルトモードの場合、更新されたserverCounterをxTestIdとして使用
        set({ 
          xTestId: `server-${data.serverCounter}`,
          serverCounter: data.serverCounter 
        });
        const defaultModeMsg = `Default mode: Using updated serverCounter as xTestId: ${data.serverCounter}`;
        console.log(defaultModeMsg);
        
        // ログに記録
        try {
          await fetch('/api/log-console', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              mode: mode, 
              messages: [defaultModeMsg] 
            }),
          });
        } catch (error) {
          console.error('Failed to log default mode message:', error);
        }
      }
    } catch (error) {
      console.error('testConfig.jsonの読み込みに失敗しました:', error);
      set({ 
        xTestId: process.env.NEXT_PUBLIC_DEFAULT_TEST_ID || '',
        serverCounter: 0 
      });
      
      // エラーログに記録
      try {
        await fetch('/api/log-console', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            mode: mode, 
            messages: [`Error: testConfig.jsonの読み込みに失敗しました: ${error}`] 
          }),
        });
      } catch (logError) {
        console.error('Failed to log error message:', logError);
      }
    }
  },
  setManualTestId: (testId: string) => {
    set({ xTestId: testId });
    const manualMsg = `Manual xTestId set to: ${testId}`;
    console.log(manualMsg);
  },
}));

export default useConfigStore;
