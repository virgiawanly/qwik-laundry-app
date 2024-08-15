import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  from,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject(false);
  private _isInitialized = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient,
    private _storageService: StorageService
  ) {
    // Check if the user is authenticated by checking the token.
    this._storageService.get(environment.api_token_identifier).then((token) => {
      if (token) {
        this._isAuthenticated.next(true);
      }

      this._isInitialized.next(true);
    });
  }

  /**
   * Set the API token in the storage.
   *
   * @param {string | null} token
   * @returns Promise<any>
   */
  setApiToken(token: string | null) {
    return new Promise((resolve) => {
      if (token) {
        this._storageService
          .set(environment.api_token_identifier, token)
          .then(() => resolve(true));
      } else {
        this._storageService.remove(environment.api_token_identifier);
        resolve(true);
      }
    });
  }

  /**
   * Verify the user phone number and send OTP code.
   *
   * @param {Object} credentials
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns Observable<any>
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this._http
      .post(`${environment.api_url}/mobile/auth/login`, credentials)
      .pipe(
        switchMap((res: any) => {
          this.setApiToken(res.data.token);
          this._isAuthenticated.next(true);

          return of(res);
        })
      );
  }

  /**
   * Login the user using the token.
   *
   * @param {string} token
   * @returns Observable<any>
   */
  loginUsingToken(token: string): Observable<any> {
    return from(
      new Promise((resolve) => {
        this.setApiToken(token);
        this._isAuthenticated.next(true);
        resolve(true);
      })
    );
  }

  /**
   * Logout the user.
   *
   * @returns Observable<boolean>
   */
  logout(): Observable<boolean> {
    this.setApiToken(null);
    this._isAuthenticated.next(false);

    return of(true);
  }

  /**
   * Check if the user is authenticated.
   *
   * @return boolean
   */
  check(): boolean {
    return this._isAuthenticated.getValue();
  }

  /**
   * Observe the authentication status.
   *
   * @return Observable<boolean>
   */
  observe(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  /**
   * Check if the service is initialized.
   *
   * @return Observable<boolean>
   */
  isInitialized(): Observable<boolean> {
    return this._isInitialized.asObservable();
  }
}
