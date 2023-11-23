import { Component} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { LocalNotifications, LocalNotificationEnabledResult, LocalNotificationSchema } from '@capacitor/local-notifications';

//const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  constructor() { }
  
  
  
  sendLocalNotification(): void {
    const notification: LocalNotificationSchema = {
      title: 'New Recipe Created',
      body: 'Check out the latest recipe!',
      id: 1, // Provide a unique ID for the notification
    };

    LocalNotifications.schedule({
      notifications: [notification],
    });
  }

}
