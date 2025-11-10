/// <reference types="vite/client" />

export async function addDevDelay(milliseconds: number = 2000): Promise<void> {
  if (import.meta.env.DEV) {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }
}
export async function withDevDelay<T>(
  promise: Promise<T>,
  delayMs: number = 2000
): Promise<T> {
  const result = await promise;
  await addDevDelay(delayMs);
  return result;
}
