import Store from 'electron-store';
import type { Options } from 'electron-store';

export class ElectronStore<T extends Record<string, any>> {
  private readonly store: Store<T>;

  constructor(options?: Options<T>) {
    this.store = new Store<T>(options);
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.store.get(key);
  }

  getAll(): T {
    return this.store.store;
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.store.set(key, value);
  }

  has<K extends keyof T>(key: K): boolean {
    return this.store.has(key);
  }

  delete<K extends keyof T>(key: K): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
