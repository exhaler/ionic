import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientPageRoutingModule } from './ingredient-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { IngredientPage } from './ingredient.page';
import { ReplaceUnderscorePipe } from "../../pipes/replace-underscore.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngredientPageRoutingModule,
    SharedModule,
  ],
  declarations: [IngredientPage, ReplaceUnderscorePipe]
})
export class IngredientPageModule {}
