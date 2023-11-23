import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recipe',
        loadComponent: () =>
          import('../recipe/recipe.page').then((m) => m.RecipePage),
      },
      {
        path: 'createnew',
        loadComponent: () =>
          import('../createnew/createnew.page').then((m) => m.CreatenewPage),
      },
      {
        path: 'restaurant',
        loadComponent: () =>
          import('../restaurant/restaurant.page').then((m) => m.RestaurantPage),
      },
      {
        path: '',
        redirectTo: '/tabs/recipe',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/recipe',
    pathMatch: 'full',
  },
];
