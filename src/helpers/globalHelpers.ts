export function sleepAsync(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function last(array: any[]): any {
  return array && array.length > 0 ? array.slice(-1)[0] : null;
}

export function first(array: any[]): any {
  return array && array.length > 0 ? array[0] : null;
}
export default function uuidv4() {
  // @ts-ignore
  return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}
