import * as config from 'config.json'

export type Config = typeof config;

export class Settings {
    static async getWpm(): Promise<number> {
        return parseInt(await this.getFromStorage('wpm'));
    }

    static async setWpm(wpm: string) {
        await chrome.storage.local.set({ 'wpm': wpm });
    }

    static async getSentencePause(): Promise<number> {
        return parseInt(await this.getFromStorage('sentencePause'));
    }

    static async setSentencePause(pause: string) {
        await chrome.storage.local.set({ 'sentencePause': pause });
    }

    static async getColor(): Promise<string> {
        // Keep css var in sync with storage value
        const color = await this.getFromStorage('color');
        return color;
    }

    static async setColor(color: string) {
        await chrome.storage.local.set({ 'color': color });
    }

    static async getFromStorage(key: keyof Config): Promise<any> {
        const result = await chrome.storage.local.get([key]);
        if (!result[key]) {
            await chrome.storage.local.set({ key: config[key] });
            return config[key];
        } else {
            return result[key];
        }
    }

    static async getConfig<K extends keyof Config, V extends Config[K]>(): Promise<Config> {
        const configFromStorage = structuredClone(config);

        for (const key of Object.keys(config)) {
            let k = key as K;
            let val = await this.getFromStorage(k) as V;
            configFromStorage[k] = val;
        }

        return configFromStorage;
    }
}
