import { Settings, Config } from "utils/settings"

/**
 * Automatically binds the chrome local storage to the inputs defined in popup.html
 **/

const setupInput = function(id: keyof Config, defaultValue: string) {
    const elem = document.getElementById(id) as HTMLInputElement;
    if (!elem) {
        console.error(`Element not found for config property: ${id}`);
        return;
    }

    elem.value = defaultValue;

    elem.addEventListener('change', async (e) => {
        await Settings.setToStorage(id, (e?.target as HTMLInputElement).value);
    })
}

void (async (): Promise<void> => {
    const config = await Settings.getConfig();
    for (const key of Object.keys(config)) {

        let value: string | number = config[key as keyof Config];
        if (typeof value === 'number') {
            value = value.toString();
        }

        setupInput(key as keyof Config, value);
    }
})();

