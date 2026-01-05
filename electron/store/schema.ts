import type { Schema } from 'electron-store';
import type { SettingsStoreSchema } from './types';



export const settingsStoreSchema: Schema<SettingsStoreSchema> = {
    checkRobots: {
        type: 'boolean',
        default: true,
    },
    downloadPath: {
        type: 'string',
        default: "",
    },
};

