import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule //IonHeader, IonToolbar, IonTitle, IonContent, 
],
})
export class Tab1Page {

  //rootPage = Tab1ContentPage;
  recipes = [
    {
      title: 'Recipe 1',
      text: 'Description for Recipe 1.',
      imageUrl: 'path/to/recipe1-image.jpg',
    },
    {
      title: 'Recipe 2',
      text: 'Description for Recipe 2.',
      imageUrl: 'path/to/recipe1-image.jpg',
    },
    // Add more recipes as needed
  ];

  constructor() {}
}
 