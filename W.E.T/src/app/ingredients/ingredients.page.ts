import { Component, OnInit, ViewChild } from "@angular/core";

import { take } from "rxjs/operators";

import { MealdbApiService } from "../services/mealdb-api.service";
import { MEALDB_ListIngredient } from "../services/model";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.page.html",
  styleUrls: ["./ingredients.page.scss"],
})
export class IngredientsPage implements OnInit {
  @ViewChild("filterBar", { static: false }) filterBar;
  ingredients: MEALDB_ListIngredient[];
  isLoading: boolean = false;
  ios: boolean;
  showSearchbar: boolean;
  filterIngredients = "";

  constructor(private mealdb: MealdbApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.mealdb
      .getIngredients()
      .pipe(take(1))
      .subscribe((results) => {
        this.isLoading = false;
        this.ingredients = results;
      });
  }

  focusFilter() {
    setTimeout(() => {
      this.filterBar.setFocus();
    },150);
  }
}