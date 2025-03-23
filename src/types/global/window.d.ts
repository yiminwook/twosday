declare global {
  interface Window {
    adfit?: {
      display: (unit: string) => void;
      destroy: (unit: string) => void;
      refresh: (unit: string) => void;
    };
  }
}

export {};
