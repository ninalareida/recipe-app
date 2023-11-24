import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'edit-recipe',
    loadComponent: () => import('./edit-recipe/edit-recipe.page').then( m => m.EditRecipePage)
  },
];
