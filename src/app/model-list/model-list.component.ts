import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../interfaces/car';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  providers: [],
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  cars: Car[];
  filtered: boolean;
  filteredCars: Car[];
  searchValue: string;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.cars = [];
    this.searchValue = '';
    this.getCars();
  }

  getCars(): void {
    this.httpClient.get<Car[]>('http://localhost:3000/api/cars').subscribe(cars => {
      this.cars = cars;
      console.log(cars);
    });
  }

  newSearch(value: string) {
    if (value.length) {
      this.searchValue = value;
      this.filteredCars = [];
      const lowerCaseValue = value.toLowerCase();
      this.cars.forEach((carInfo) => {
        if (carInfo.name.toLowerCase().includes(lowerCaseValue)
          || carInfo.desc.includes(lowerCaseValue)
          || carInfo.series.includes(lowerCaseValue)) {
          this.filteredCars.push(carInfo);
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

  addFavorite(id: string) {
    this.httpClient.post('http://localhost:3000/api/add-favorite', {id}).subscribe(added => added ? this.getCars() : null);
  }
}
