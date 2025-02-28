import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTraitsKey(productId: string, traits: string[]): string {
  // remove space & lowercase all traits
  let key = '';
  let keyArray: string[] = [];
  traits.forEach(str => {
    keyArray.push(str.replace(/\s/g, '').toLowerCase());
  });
  // alphabetize, join traits to product id to create key string
  key = productId + '/' + keyArray.sort().join('-');
  return key;
}
