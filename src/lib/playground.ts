import { compressToEncodedURIComponent } from 'lz-string';

export function playgroundURL(code: string): string {
  return `https://www.typescriptlang.org/play?#code/${compressToEncodedURIComponent(code)}`;
}
