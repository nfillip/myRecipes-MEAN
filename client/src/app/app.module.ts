import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeFormComponent } from "./recipe-form/recipe-form.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component"; // <-- add this line

@NgModule({
  declarations: [
    AppComponent,
    RecipesListComponent,
    RecipeFormComponent,
    AddRecipeComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // <-- add this line
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
