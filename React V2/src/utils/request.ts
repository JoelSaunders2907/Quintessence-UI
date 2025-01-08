export function generateRequestId(): string {
  return Math.random().toString(36).substring(7);
}