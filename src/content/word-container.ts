import { Utils } from "utils/utils";
import { Animate } from "./animation";
import { Config, Settings } from "shared/settings";
import config from '../shared/config.json'

export class WordContainer extends Animate {

    private cachedHTML = '';
    private config: Config;
    private words: string[];

    constructor(private element: HTMLParagraphElement) {
        super();
        this.config = config;
        this.words = element.innerText.split(' ');
    }

    // Settings require async calls, setup component here first
    async init(): Promise<void> {
        this.config = await Settings.getConfig();
        this.play();
    }

    render(word: string): string {
        let characters = word.split('');

        const middleIndex = Math.floor(characters.length / 2);

        characters = characters.map((char, index) =>
            `<span style="color: ${index === middleIndex ? this.config?.color : 'inherit'}" class='spdr-letter ${index === middleIndex ? 'spdr-middle-letter' : ''}'>${char}</span>`
        );

        if (characters.length % 2 === 0) {
            characters.push(`<span class='spdr-letter'>&#8199;</span>`);
        }

        return `
            <div class="spdr-word-container" style="height: ${this.element.clientHeight}px">
                ${characters.join('\n')}
            </div>
        `;
    }

    resetElement(): void {
        // Reset element
        this.element.innerHTML = this.cachedHTML;
    }

    onStop(): void {
        this.resetElement();
    }

    onTick(tick: number): number {
        if (tick === this.words.length) {
            this.stop();
            return -1;
        }

        let word = this.words[tick];
        // cache html on first run
        if (tick === 0) {
            this.cachedHTML = this.element.innerHTML;
        }
        this.element.innerHTML = this.render(word);

        let delay = Utils.wpmToMiliseconds(this.config?.wpm);
        // Add extra pause at the very beginning and the end of a sentence
        if (word.includes('.') || tick === 0) {
            delay += this.config?.sentencePause;
        }
        return delay;
    }
}
