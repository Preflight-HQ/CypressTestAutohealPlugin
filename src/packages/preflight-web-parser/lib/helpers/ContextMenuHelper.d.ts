export default class ContextMenuHelper {
    event: Event;
    contextMenuTarget: {} | null;
    onContextMenuOpened(e: Event): void;
    start(): void;
    stop(): void;
}
