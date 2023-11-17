import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Recipe } from '../data/recipe';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../service/supabase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule // IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
]
})
export class Tab2Page {

  recipe : Recipe = new Recipe()

  public recipeForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    instructions: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  })

  constructor(
    private supabaseService : SupabaseService,
    private formBuilder : FormBuilder,
    private router : Router,
    private route : ActivatedRoute) {}


  async back () {
    await this.router.navigate(['tabs','tab1'])
  }

  saveRecipe(formData : any) {
    this.recipe = Object.assign(formData)

    this.supabaseService.createRecipe(this.recipe)
          .then(payload=>{
            this.back()
          })
  }

}
