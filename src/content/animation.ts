import { IControllable } from "./controllable";
import { Controller } from "./controller";

export abstract class Animate implements IControllable {
    private tick = 0;
    private prevTick = -1;
    private state: 'resumed' | 'paused' | 'stopped' = 'resumed';

    abstract onTick(tick: number): number
    abstract onStop(): void

    constructor() {
        new Controller().bindControls(this);
    }

    play(): void {
        let delay = 100;

        if (this.tick != this.prevTick) {
            delay = this.onTick(this.tick);
        }

        this.prevTick = this.tick;

        if (this.state === 'resumed') {
            this.forward();
        }

        // Check next frame if either resumed or paused
        if (this.state !== 'stopped') {
            setTimeout(this.play.bind(this), delay);
        }

    };

    forward(): void {
        this.tick++;
    }

    back(): void {
        if (this.tick != 0) {
            this.tick--;
        }
    }

    pause(): void {
        this.state = 'paused';
    }

    resume(): void {
        this.state = 'resumed';
    }

    toggle(): void {
        if (this.state === 'paused') {
            this.state = 'resumed'
        } else if (this.state === 'resumed') {
            this.state = 'paused';
        }
    }

    stop(): void {
        this.tick = 0;
        this.state = 'stopped';
        this.onStop();
    }

}
