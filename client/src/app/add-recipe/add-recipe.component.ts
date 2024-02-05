import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Recipe } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-add-recipe",
  template: `
    <h2 class="text-center m-5">Add a New Recipe</h2>
    <app-recipe-form
      (formSubmitted)="addRecipe($event)"
    ></app-recipe-form>
  `,
})
export class AddEmployeeComponent {
  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  addEmployee(recipe: Recipe) {
    this.recipeService.createRecipe(recipe).subscribe({
      next: () => {
        this.router.navigate(["/recipe"]);
      },
      error: (error) => {
        alert("Failed to create recipe");
        console.error(error);
      },
    });
  }
}
