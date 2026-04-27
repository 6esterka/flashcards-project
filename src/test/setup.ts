import "@testing-library/jest-dom";

const storage: Record<string, string> = {};

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value;
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((k) => delete storage[k]);
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i: number) => Object.keys(storage)[i] ?? null,
  },
  writable: true,
});
