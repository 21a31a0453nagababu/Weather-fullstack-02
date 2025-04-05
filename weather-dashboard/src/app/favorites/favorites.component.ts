import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  imports: [NgFor, NgIf, FormsModule]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: string[] = [];
  private subscription: Subscription;
  editingCity: string | null = null;
  editedCityName: string = '';

  constructor(private favoritesService: FavoritesService) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites = favorites;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startEditing(city: string): void {
    this.editingCity = city;
    this.editedCityName = city;
  }

  saveEdit(): void {
    if (this.editingCity && this.editedCityName.trim()) {
      this.favoritesService.updateFavorite(this.editingCity, this.editedCityName.trim());
      this.editingCity = null;
      this.editedCityName = '';
    }
  }

  cancelEdit(): void {
    this.editingCity = null;
    this.editedCityName = '';
  }

  removeFavorite(city: string): void {
    this.favoritesService.removeFavorite(city);
  }
}
