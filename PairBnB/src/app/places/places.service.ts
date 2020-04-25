import { Injectable } from "@angular/core";
import { Place } from "./place.model";
import { AuthService } from "../auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the hear of New York City.",
      "https://static3.mansionglobal.com/production/media/article-images/3f32c767fc327e62abb28a2f9dc8d4a5/large_GettyImages-637703666.jpg",
      149.99,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "abc"
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic place in Paris!",
      "https://a0.muscache.com/im/pictures/66092977/1911951d_original.jpg?aki_policy=xx_large",
      189.99,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "abc"
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not you average city trip!",
      "https://cdn.theculturetrip.com/wp-content/uploads/2016/04/screenshot-958.png",
      99.99,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "abc"
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) {}

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://cdn.theculturetrip.com/wp-content/uploads/2016/04/screenshot-958.png",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    this.places.pipe(take(1)).subscribe((places) => {
      this._places.next(places.concat(newPlace));
    });
  }
}
