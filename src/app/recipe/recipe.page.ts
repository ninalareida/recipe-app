import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, NavController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Recipe } from '../data/recipe';
import { SupabaseService } from '../service/supabase.service';
import { EditRecipePage } from '../edit-recipe/edit-recipe.page';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule //IonHeader, IonToolbar, IonTitle, IonContent, 
],
})
export class RecipePage {

  recipes: Array<Recipe> | null = []

  constructor(private supabaseService: SupabaseService, 
    private navController: NavController, private modalController: ModalController,
    private toastController: ToastController) {}

  isLoading = true;

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.supabaseService.getRecipes()
      .then(data => {
        console.log('Fetched recipes in RecipePage:', data);
        this.recipes = data
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  deleteRecipe(recipeId: number) {
    this.supabaseService.deleteRecipe(recipeId)
      .then(() => {
        // If deletion is successful, remove the recipe from the local array
        this.recipes = this.recipes!.filter(recipe => recipe.id !== recipeId);
        this.presentDeleteToast(); // Display success toast
      })
      .catch(error => {
        console.error('Error deleting recipe:', error);
      });
  }

  async editRecipe(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: EditRecipePage,
      componentProps: {
        recipe: { ...recipe }, // Pass a copy of the recipe to avoid modifying the original in the list
      },
    });

    modal.onDidDismiss().then((data) => {
      // If the modal was dismissed with changes, update the local recipe array
      if (data.data && data.data.dismissed) {
        const editedRecipe: Recipe = data.data.editedRecipe;
        const index = this.recipes!.findIndex((r) => r.id === editedRecipe.id);
        if (index !== -1) {
          this.recipes![index] = editedRecipe;
          this.presentEditToast(); // Display success toast
        }
      }
    });

    return await modal.present();
  }

  async presentDeleteToast() {
    const toast = await this.toastController.create({
      message: 'Recipe deleted successfully!',
      duration: 2000, // Display duration in milliseconds
      position: 'bottom', // You can change the position as per your preference
    });
    toast.present();
  }

  async presentEditToast() {
    const toast = await this.toastController.create({
      message: 'Recipe edited successfully!',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
  
}
 