import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { Plugins, Capacitor } from '@capacitor/core';

interface Coordinates {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})

export class RecipesPage implements OnInit {

  private recipes: Recipe[];
  private data: Coordinates[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
    this.data = [];
    this.getlocation();
  }

  private getlocation() {
    setInterval(() => {
      this.locateUser();
    }, 3000);
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Error');
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
        const coordinates: Coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        console.log(coordinates);
        this.data.push(coordinates);
      })
      .catch(err => {
        console.log('catch error');
      });
  }

}
