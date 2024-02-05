import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipes-list",
  template: `
    <h2 class="text-center m-5">Recipe List</h2>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let recipe of recipes$ | async">
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.position }}</td>
          <td>{{ recipe.level }}</td>
          <td>
            <button
              class="btn btn-primary me-1"
              [routerLink]="['edit/', recipe._id]"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              (click)="deleteRecipe(recipe._id || '')"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">
      Add a New Recipe
    </button>
  `,
})
export class RecipesListComponent implements OnInit {
  recipes$: Observable<Recipe[]> = new Observable();

  constructor(private recipesService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes();
  }

  deleteRecipe(id: string): void {
    this.recipesService.deleteRecipe(id).subscribe({
      next: () => this.fetchRecipes(),
    });
  }

  private fetchRecipes(): void {
    this.recipes$ = this.recipesService.getRecipes();
  }
}
