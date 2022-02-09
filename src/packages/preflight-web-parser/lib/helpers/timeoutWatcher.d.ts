declare class TimeoutWatcher {
    private watchers;
    startNew(id: string, timeoutMs: number): void;
    clear(id: string): void;
    checkTimeout(id: string): void;
}
declare const _default: TimeoutWatcher;
export default _default;
