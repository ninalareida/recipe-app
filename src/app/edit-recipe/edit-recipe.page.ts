import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { Recipe } from '../data/recipe';
import { SupabaseService } from '../service/supabase.service';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CameraComponent]
})
export class EditRecipePage implements OnInit {

  recipe?: Recipe;
  
  constructor(private navParams: NavParams, private modalController: ModalController, 
    public supabaseService: SupabaseService) { }

  ngOnInit() {
    // Get the recipe passed from the parent component
    this.recipe = this.navParams.get('recipe') || { title: '', instructions: '', image: '' };;
  }

  updateImage(imageUrl: string | null) {
    if (this.recipe) {
      this.recipe.image = imageUrl;
    }
  }

  saveChanges() {
    if (this.recipe) {
      this.supabaseService.updateRecipe(this.recipe)
        .then(() => {
          console.log('Changes saved successfully');
          this.modalController.dismiss({
            dismissed: true,
            editedRecipe: this.recipe,
          });
        })
        .catch((error) => {
          console.error('Error saving changes:', error);
        });
    }
    
  }

  dismiss() {
    // Dismiss the modal without saving changes
    this.modalController.dismiss({
      dismissed: true,
    });
  }


}
