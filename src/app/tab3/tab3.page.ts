import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../service/supabase.service';
import { Supermarket } from '../data/supermarket';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule // IonHeader, IonToolbar, IonTitle, IonContent, 
  ],
})
export class Tab3Page implements OnInit {

  supermarkets: Array<Supermarket> | null = []
  //supermarkets: any[] = [];
  /*
  supermarkets = [
    {
      name: 'Supermarket 1',
      info: 'Info for Supermarket 1.',
    },
    {
      name: 'Supermarket 2',
      info: 'Info for Supermarket 2.',
    },
    // Add more supermarkets as needed
  ];
  */

  constructor(private supabaseService: SupabaseService) {}

  isLoading = true;

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.supabaseService.getSupermarkets()
      .then(data => {
        console.log('Fetched supermarkets in Tab3Page:', data);
        this.supermarkets = data
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  /*
  async fetchSupermarkets() {
    const fetchedSupermarkets = await this.supabaseService.getSupermarkets();
    console.log('Fetched supermarkets in Tab1Page:', fetchedSupermarkets);
    this.supermarkets = fetchedSupermarkets || []; // Handle null by assigning an empty array
  }
  */
}
