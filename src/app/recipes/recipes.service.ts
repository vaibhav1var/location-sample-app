import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'paneer tikka masala',
      imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2014/11/paneer-butter-masala-recipe-2-500x375.jpg',
      ingredients : ['Panner', 'curd']
    },
    {
      id: 'r2',
      title: 'Naan',
      imageUrl: 'https://www.jocooks.com/wp-content/uploads/2011/04/naan-bread-1.jpg',
      ingredients : ['flour', 'water']
    },
  ];

  constructor() { }

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(rid: string) {
    return {
      ...this.recipes.find(r => r.id === rid)
    }
  }
}
