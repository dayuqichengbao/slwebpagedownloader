import { ElectronStore } from './electron-store';
import { settingsStoreSchema } from './schema';
import type { SettingsStoreSchema } from './types';

export const settingsStore = new ElectronStore<SettingsStoreSchema>({
  name: 'app-config',
  schema: settingsStoreSchema,
});
