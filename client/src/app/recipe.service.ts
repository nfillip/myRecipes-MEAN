import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url = 'http://localhost:5200';
  private recipes$: Subject<Recipe[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshRecipes() {
    this.httpClient.get<Recipe[]>(`${this.url}/recipes`)
      .subscribe(recipes => {
        this.recipes$.next(recipes);
      });
  }

  getRecipes(): Subject<Recipe[]> {
    this.refreshRecipes();
    return this.recipes$;
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.url}/recipes/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<string> {
    return this.httpClient.post(`${this.url}/recipes`, recipe, { responseType: 'text' });
  }

  updateRecipe(id: string, recipe: Recipe): Observable<string> {
    return this.httpClient.put(`${this.url}/recipes/${id}`, recipe, { responseType: 'text' });
  }

  deleteRecipe(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/recipes/${id}`, { responseType: 'text' });
  }
}
