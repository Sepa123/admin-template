import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: { [key: string]: any } = {};

  constructor() { }

  set(key: string, data: any): void {
    this.cache[key] = data;
  }

  get(key: string): any {
    return this.cache[key];
  }

  clear(key: string): void {
    delete this.cache[key];
  }

  clearAll(): void {
    this.cache = {};
  }
}
