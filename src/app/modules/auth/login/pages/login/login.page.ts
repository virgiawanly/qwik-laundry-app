import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    public platform: Platform,
    private _httpService: HttpService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.platform.ready().then(() => {
      GoogleAuth.initialize();
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
