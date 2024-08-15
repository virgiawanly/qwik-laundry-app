import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoginForm } from './login-form';
import { HttpFormattedErrorResponse } from 'src/types/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLoggingIn: boolean = false;
  loginForm: LoginForm = new LoginForm();

  constructor(
    public platform: Platform,
    private _httpService: HttpService,
    private _authService: AuthService,
    private _router: Router,
    private _toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      GoogleAuth.initialize();
    });
  }

  login() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid && !this.isLoggingIn) {
      return;
    }

    this.isLoggingIn = true;
    this.loginForm.disable();
    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this._router.navigateByUrl('/home', {
          replaceUrl: true,
        });
      },
      error: (error: HttpFormattedErrorResponse) => {
        this.isLoggingIn = false;
        this.loginForm.enable();
        this._toastController
          .create({
            message: error.message,
            duration: 3000,
            position: 'bottom',
          })
          .then((toast) => toast.present());
      },
    });
  }

  loginWithGoogle() {
    GoogleAuth.signIn()
      .then((user) => {
        this._httpService
          .post(
            `mobile/auth/google/authenticate`,
            { token: user.authentication.idToken },
            { withCredentials: false }
          )
          .subscribe({
            next: (res: any) => {
              // Next action to perform
              const action = res.data.action;

              // Login or register action
              if (action === 'login') {
                const accessToken = res.data.access_token;
                this._authService.loginUsingToken(accessToken).subscribe(() => {
                  this._router.navigateByUrl('/home', {
                    replaceUrl: true,
                  });
                });
              } else if (action === 'register') {
                const registrationToken = res.data.registration_token;
                this._router.navigateByUrl(
                  '/auth/registration/register-company',
                  { state: { registration_token: registrationToken } }
                );
              } else {
                throw new Error('Invalid action');
              }
            },
            error: (error) => {
              console.error('Error during Google login', error);
            },
          });
      })
      .catch((error) => {
        console.error('Error during Google login', error);
      });
  }
}
