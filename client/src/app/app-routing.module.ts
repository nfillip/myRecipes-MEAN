import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { AddEmployeeComponent } from "./add-recipe/add-recipe.component"; // <-- add this line
import { EditEmployeeComponent } from "./edit-recipe/edit-recipe.component"; // <-- add this line

const routes: Routes = [
  { path: "", redirectTo: "employees", pathMatch: "full" },
  { path: "recipes", component: RecipesListComponent },
  { path: "recipes/new", component: AddEmployeeComponent }, // <-- add this line
  { path: "recipes/edit/:id", component: EditEmployeeComponent },
]; // <-- add this line

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
