import { Settings } from "utils/settings"

const wpmInput = document.getElementById('wpm') as HTMLInputElement
const pauseInput = document.getElementById('sentencePause') as HTMLInputElement
const colorInput = document.getElementById('color') as HTMLInputElement

Settings.getWpm().then((result) => {
    wpmInput.value = result.toString();
})

Settings.getSentencePause().then((result) => {
    pauseInput.value = result.toString();
})

Settings.getColor().then((result) => {
    colorInput.value = result.toString();
})

wpmInput.addEventListener('change', async (e) => {
    await Settings.setWpm((e?.target as HTMLInputElement).value);
});

pauseInput.addEventListener('change', async (e) => {
    await Settings.setSentencePause((e?.target as HTMLInputElement).value);
});

colorInput.addEventListener('change', async (e) => {
    await Settings.setColor((e?.target as HTMLInputElement).value);
});

