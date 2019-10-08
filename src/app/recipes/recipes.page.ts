import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { Plugins, Capacitor } from '@capacitor/core';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

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

  constructor(private recipesService: RecipesService, private backgroundGeolocation: BackgroundGeolocation) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
    this.data = [];
    //this.getlocation();
    this.startBackgroundGeolocation();
  }
  startBackgroundGeolocation() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .then(() => {

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });

      });

    // start recording location
    this.backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    this.backgroundGeolocation.stop();
  }

  sendGPS(location) {
    if (location.speed == undefined) {
      location.speed = 0;
    }
    let timestamp = new Date(location.time);
    console.log(timestamp);
    const coordinates: Coordinates = {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            };
            console.log(coordinates);
            this.data.push(coordinates);
  }
}

//   private getlocation() {
//   setInterval(() => {
//     this.locateUser();
//   }, 3000);
// }

//   private locateUser() {
//   if (!Capacitor.isPluginAvailable('Geolocation')) {
//     console.log('Error');
//     return;
//   }
//   Plugins.Geolocation.getCurrentPosition()
//     .then(geoPosition => {
//       const coordinates: Coordinates = {
//         lat: geoPosition.coords.latitude,
//         lng: geoPosition.coords.longitude
//       };
//       console.log(coordinates);
//       this.data.push(coordinates);
//     })
//     .catch(err => {
//       console.log('catch error');
//     });
// }

