import { WordContainer } from "word-container";


function setOnClick(elements: HTMLCollectionOf<HTMLParagraphElement>) {
    for (let index = 0; index < elements.length; index++) {
        const element = elements.item(index)
        if (!element) {
            continue;
        }
        element.addEventListener('click', (event) => {
            if (event.target && event.target instanceof HTMLParagraphElement) {
                void speedReadParagraph(event.target);
            }
        })
    }
}

async function speedReadParagraph(p: HTMLParagraphElement) {
    const wordComponent = new WordContainer(p);
    await wordComponent.init();

    wordComponent.animateWords();

}

setOnClick(document.getElementsByTagName('p'))
