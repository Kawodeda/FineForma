export interface IKeyboardEventArgs {

    get code(): string;

    get altKey(): boolean;

    get shiftKey(): boolean;

    get ctrlKey(): boolean;

    get repeat(): boolean;
}