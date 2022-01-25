export function sleepAsync(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function last(array: any[]): any {
  return array && array.length > 0 ? array.slice(-1)[0] : null;
}

export function first(array: any[]): any {
  return array && array.length > 0 ? array[0] : null;
}
