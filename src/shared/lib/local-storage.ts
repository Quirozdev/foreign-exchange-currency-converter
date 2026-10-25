export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

export function getItemOrDefault<T>(key: string, defaultValue: T): T {
  return getItem(key) ?? defaultValue;
}

export function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
