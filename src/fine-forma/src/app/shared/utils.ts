export function handleAsyncAction(action: Promise<void>): void {
    action.catch(console.error);
}