import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Recipe } from '../data/recipe';

export const SUPERMARKET_TABLE = 'supermarket'
export const RECIPE_TABLE = 'recipe'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
   }

   createLoader() {
    return this.loadingCtrl.create()
  }

  async getSupermarkets() {
    const { data, error } = await this.supabase
      .from(SUPERMARKET_TABLE)
      .select('*');
    console.log('Supabase Response:', { data, error });
    return data || [];
  }

  async getRecipes() {
    const { data, error } = await this.supabase
      .from(RECIPE_TABLE)
      .select('*');
    console.log('Supabase Response:', { data, error });
    return data || [];
  }

  async createRecipe(recipe : Recipe) {
    const {data, error} = await this.supabase
      .from(RECIPE_TABLE)
      .insert({
        title: recipe.title,
        instructions: recipe.instructions,
        image: recipe.image
      })
      .select('*')
      .single();

    return data
  }




  /*
   async getSupermarkets() {
    const { data, error } = await this.supabase
      .from(SUPERMARKET_TABLE).select('*');
    
    if (error) {
      console.error('Error fetching data:', error.message);
    }
    console.log('Fetched data:', data);
    
    return data || []; // Return an empty array if data is null
  }
  */
}
