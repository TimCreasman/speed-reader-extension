export interface IControllable {
    play(): void;
    forward(): void;
    back(): void;
    pause(): void;
    resume(): void;
    toggle(): void;
    stop(): void;
}
