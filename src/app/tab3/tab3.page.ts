import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../service/supabase.service';
import { Supermarket } from '../data/supermarket';
import { GeolocatorService } from '../service/geolocator.service';

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

  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0

  constructor(private supabaseService: SupabaseService,  public geolocationService : GeolocatorService) {}

  isLoading = true;

  ngOnInit() {
    this.loadData()
    this.getCurrentPosition()
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

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    this.altitude = position.coords.altitude
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
    this.altitude = 0
  }

  /*
  async fetchSupermarkets() {
    const fetchedSupermarkets = await this.supabaseService.getSupermarkets();
    console.log('Fetched supermarkets in Tab1Page:', fetchedSupermarkets);
    this.supermarkets = fetchedSupermarkets || []; // Handle null by assigning an empty array
  }
  */
}
