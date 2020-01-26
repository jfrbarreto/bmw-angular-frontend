import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../interfaces/car';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  providers: [],
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private httpClient: HttpClient) {
  }


  favorites: Car[];
  filtered: boolean;
  filteredFavorites: Car[];
  searchValue: string;

  ngOnInit() {

    this.favorites = [];
    this.searchValue = '';
    this.getFavorites();
  }

  //
  getFavorites(): void {
    this.httpClient.get<Car[]>('http://localhost:3000/api/favorites').subscribe(favorites => {

      if (favorites && favorites.length) {
        this.favorites = favorites;
      } else {
        this.favorites = [];
      }


    });
  }

  delFavorite(id: string) {
    this.httpClient.delete('http://localhost:3000/api/del-favorite/' + id).subscribe(removed => {
      if (removed) {
        this.getFavorites();
      }
    });
  }


  //
  newSearch(value: string) {
    if (value.length) {
      this.searchValue = value;
      this.filteredFavorites = [];
      const lowerCaseValue = value.toLowerCase();
      this.favorites.forEach((carInfo) => {
        if (carInfo.name.toLowerCase().includes(lowerCaseValue)
          || carInfo.desc.includes(lowerCaseValue)
          || carInfo.series.includes(lowerCaseValue)) {
          this.filteredFavorites.push(carInfo);
        }
      });
      this.filtered = true;
    } else {
      this.filtered = false;
    }
  }

  clearSearch(): void {
    this.filtered = false;
    this.searchValue = '';
  }
}
