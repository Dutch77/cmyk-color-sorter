export interface Persister {
  count: () => Promise<number>
  getItem: <T>(key: string, defaultValue: T) => Promise<T>
  setItem: <T>(key: string, value: T) => Promise<void>
  deleteItem: <T>(key: string) => Promise<void>
  clear: () => Promise<void>;
}
