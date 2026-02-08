export function playgroundURL(code: string): string {
  return `https://www.typescriptlang.org/play?#code/${btoa(unescape(encodeURIComponent(code)))}`;
}
