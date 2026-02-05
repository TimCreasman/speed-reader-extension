import { IControllable } from "./controllable";

export class Controller {
    bindControls(controllable: IControllable) {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowRight':
                    controllable.pause();
                    controllable.forward();
                    break;
                case 'ArrowLeft':
                    controllable.pause();
                    controllable.back();
                    break;
                case 'Space':
                    // TODO I will probably want a less invasive solution here
                    e.preventDefault();
                    controllable.toggle();
                    break;
                case 'Enter':
                    controllable.stop();
                default:
                    break;
            }
        })
    }
}
