import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CameraComponent {

  imageUrl : string | undefined

  constructor() { }

  takePicture = async () => {

    // const permissionStatus = await Camera.requestPermissions()

    // console.log(permissionStatus)

    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.imageUrl = image.webPath;

  };

  resetPicture () {
    this.imageUrl = ''
  }

  //ngOnInit() {}

}
