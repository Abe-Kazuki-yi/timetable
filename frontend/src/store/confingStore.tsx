import { create } from 'zustand';

interface ConfigState {
  xTestId: string;
  setConfig: (config: Partial<ConfigState>) => void;
}

const useConfigStore = create<ConfigState>((set) => ({
  xTestId: '',
  setConfig: (config) => set(config),
}));

export default useConfigStore;
