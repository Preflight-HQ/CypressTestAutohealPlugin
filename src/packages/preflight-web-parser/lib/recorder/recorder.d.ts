import WebPageParser from "../parser/WebPageParser";
declare class Recorder {
    isRecording: boolean;
    steps: any[];
    handleKeyUpDelegate: (e: any) => void;
    handleClickDelegate: (e: any) => void;
    webParser: WebPageParser;
    start(): void;
    stop(): void;
    handleKeyUp(event: KeyboardEvent): void;
    handleClick(event: any): void;
    saveStep(hEl: HTMLElement | null, actionType: string | null, actionValue?: string | null): void;
}
declare const recorder: Recorder;
export { recorder };
