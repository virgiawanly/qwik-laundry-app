import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpFormattedErrorResponse } from 'src/types/http';

@Component({
  selector: 'app-setting-index',
  templateUrl: './setting-index.page.html',
  styleUrls: ['./setting-index.page.scss'],
})
export class SettingIndexPage {
  isLoggingOut: boolean = false;

  constructor(
    private _alertController: AlertController,
    private _translateService: TranslateService,
    private _authService: AuthService,
    private _toastController: ToastController,
    private _router: Router
  ) {}

  openLogoutConfirmation() {
    if (this.isLoggingOut) {
      return;
    }

    this._alertController
      .create({
        header: this._translateService.instant('settings.logout.header'),
        message: this._translateService.instant('settings.logout.message'),
        buttons: [
          {
            text: this._translateService.instant('settings.logout.cancel'),
            role: 'cancel',
          },
          {
            text: this._translateService.instant('settings.logout.confirm'),
            handler: () => {
              this.logout();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }

  logout() {
    this.isLoggingOut = true;
    this._authService.logout().subscribe({
      next: () => {
        // Close the loading
        this.isLoggingOut = false;

        // Let the loading close before navigating to the login page
        setTimeout(() => {
          this._router.navigateByUrl('/auth', { replaceUrl: true });
        });
      },
      error: (error: HttpFormattedErrorResponse) => {
        this.isLoggingOut = false;
        this._toastController
          .create({
            message: error.message,
            duration: 3000,
            position: 'bottom',
          })
          .then((toast) => {
            toast.present();
          });
      },
    });
  }
}
