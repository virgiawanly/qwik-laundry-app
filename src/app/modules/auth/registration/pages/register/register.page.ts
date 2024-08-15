import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpFormattedErrorResponse } from 'src/types/http';
import { RegisterForm } from './register-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  isSubmitting: boolean = false;
  registerForm: RegisterForm = new RegisterForm();

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

  submit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.registerForm.disable();
    this._httpService
      .post(
        'mobile/auth/registration/validate-account',
        this.registerForm.value
      )
      .subscribe({
        next: () => {
          this._router.navigateByUrl('/auth/registration/register-company', {
            state: {
              ...this.registerForm.value,
            },
          });
        },
        error: (error: HttpFormattedErrorResponse) => {
          this._toastController
            .create({
              message: error.message,
              duration: 3000,
              position: 'bottom',
            })
            .then((toast) => toast.present());
        },
      })
      .add(() => {
        this.isSubmitting = false;
        this.registerForm.enable();
      });
  }

  registerWithGoogle() {
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
