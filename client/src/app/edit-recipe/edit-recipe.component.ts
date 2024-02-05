import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Recipe } from "../recipe";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-edit-recipe.component.ts",
  template: `
    <h2 class="text-center m-5">Edit a Recipe</h2>
    <app-recipe-form
      [initialState]="recipe"
      (formSubmitted)="editRecipe($event)"
    ></app-recipe-form>
  `,
})
export class EditRecipeComponent implements OnInit {
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      alert("No id provided");
    }

    this.recipeService.getRecipe(id!).subscribe((recipe) => {
      this.recipe.next(recipe);
    });
  }

  editRecipe(recipe: Recipe) {
    this.recipeService
      .updateRecipe(this.recipe.value._id || "", recipe)
      .subscribe({
        next: () => {
          this.router.navigate(["/recipes"]);
        },
        error: (error) => {
          alert("Failed to update recipe");
          console.error(error);
        },
      });
  }
}
