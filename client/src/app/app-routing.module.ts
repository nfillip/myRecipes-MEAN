import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component"; // <-- add this line
import { EditRecipeComponent } from "./edit-recipe/edit-recipe.component"; // <-- add this line

const routes: Routes = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  { path: "recipes", component: RecipesListComponent },
  { path: "recipes/new", component: AddRecipeComponent }, // <-- add this line
  { path: "recipes/edit/:id", component: EditRecipeComponent },
]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
