import { Config, Settings } from "utils/settings";
import { Utils } from "utils/utils";
import * as config from 'config.json'

export class WordContainer {

    private cachedHTML = '';
    private config: Config;
    private words: string[];
    // animation tick
    private tick = 0;

    constructor(private element: HTMLParagraphElement) {
        this.config = config;
        this.words = element.innerText.split(' ');
    }

    // Settings require async calls, setup component here first
    async init(): Promise<void> {
        this.config = await Settings.getConfig();
    }

    render(word: string): string {
        let characters = word.split('');

        const middleIndex = Math.floor(characters.length / 2);

        characters = characters.map((char, index) =>
            `<span style="color: ${index === middleIndex ? this.config?.color : ''}" class='spdr-letter ${index === middleIndex ? 'spdr-middle-letter' : ''}'>${char}</span>`
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

    animateWords(): void {
        if (this.tick === this.words.length) {
            // Reset element
            this.element.innerHTML = this.cachedHTML;
            return;
        }

        let word = this.words[this.tick];

        let delay = Utils.wpmToMiliseconds(this.config?.wpm);


        // cache html on first run
        if (this.tick === 0) {
            this.cachedHTML = this.element.innerHTML;
        }

        this.element.innerHTML = this.render(word);

        // Add extra pause at the very beginning and the end of a sentence
        if (word.includes('.') || this.tick === 0) {
            delay += this.config?.sentencePause;
        }

        this.tick++;
        setTimeout(this.animateWords.bind(this), delay);
    }
}
