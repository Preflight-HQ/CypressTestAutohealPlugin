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
export function groupBy(xs: any[], key: string) {
  return xs.reduce(function(rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
export const toSentenceCase = camelCaseString => {
  let result = camelCaseString.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export const base64ToString = (input) => {
  return decodeURIComponent(atob( input ))
}
