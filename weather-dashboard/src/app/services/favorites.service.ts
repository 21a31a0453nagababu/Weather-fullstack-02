import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storageKey = 'favoriteCities';
  private favoritesSubject = new BehaviorSubject<string[]>(this.getFavorites());
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {}

  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addFavorite(city: string): void {
    let favorites = this.getFavorites();
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    }
  }

  removeFavorite(city: string): void {
    let favorites = this.getFavorites().filter(c => c !== city);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  updateFavorite(oldCity: string, newCity: string): void {
    let favorites = this.getFavorites();
    const index = favorites.indexOf(oldCity);
    if (index !== -1 && !favorites.includes(newCity)) {
      favorites[index] = newCity;
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      this.favoritesSubject.next(favorites);
    }
  }
}
