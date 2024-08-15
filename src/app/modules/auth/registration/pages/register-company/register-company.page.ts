import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';
import { RegisterCompanyForm } from './register-company-form';
import { HttpFormattedErrorResponse } from 'src/types/http';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {
  isSubmitting: boolean = false;
  registerMethod: 'email' | 'google' = 'email';
  registerCompanyForm: RegisterCompanyForm = new RegisterCompanyForm();
  stateRegistrationPayload: any = {};

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private _toastController: ToastController,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.validateRegistrationState();
  }

  validateRegistrationState() {
    const state = this._router.getCurrentNavigation()?.extras?.state;

    if (!state) {
      this._router.navigateByUrl('/auth/registration', {
        replaceUrl: true,
      });
      return;
    }

    const isEmailRegistration =
      state &&
      !!state['name'] &&
      !!state['email'] &&
      !!state['password'] &&
      !!state['password_confirmation'];

    const isGoogleRegistration = state && state['registration_token'];

    if (!isEmailRegistration && !isGoogleRegistration) {
      this._router.navigateByUrl('/auth/registration', {
        replaceUrl: true,
      });
      return;
    }

    if (isEmailRegistration) {
      this.registerMethod = 'email';
      this.stateRegistrationPayload = {
        name: state['name'],
        email: state['email'],
        password: state['password'],
        password_confirmation: state['password_confirmation'],
      };
    } else if (isGoogleRegistration) {
      this.registerMethod = 'google';
      this.stateRegistrationPayload = {
        registration_token: state['registration_token'],
      };
    }
  }

  submit() {
    this.registerCompanyForm.markAllAsTouched();

    if (this.registerCompanyForm.invalid || this.isSubmitting) {
      return;
    }

    const url =
      this.registerMethod === 'google'
        ? 'mobile/auth/registration/google'
        : 'mobile/auth/registration/register';

    const payload = {
      ...this.stateRegistrationPayload,
      ...this.registerCompanyForm.value,
    };

    this.isSubmitting = true;
    this.registerCompanyForm.disable();
    this._httpService.post(url, payload).subscribe({
      next: (res: any) => {
        const token = res.data.token;
        if (token) {
          this._authService.loginUsingToken(token).subscribe({
            next: () => {
              this._router.navigateByUrl('/home', { replaceUrl: true });
            },
          });
        } else {
          console.error('NO TOKEN RETURNED AFTER REGISTRATION');
        }
      },
      error: (error: HttpFormattedErrorResponse) => {
        this.registerCompanyForm.enable();
        this.isSubmitting = false;
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
}
