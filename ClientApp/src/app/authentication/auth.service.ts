import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { AuthApi } from './auth.api';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private authApi: AuthApi;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.authApi = new AuthApi(http);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    async signIn(username: string, password: string) {
      let user = new User();
      user.username = username;
      if (password) {
          user.password = password;
      } else {
          user.password = '';
      }
      const authResponse = await this.authApi.signIn(user);
      if (authResponse)
      {
        user = authResponse.user;
        user.password = '';
        user.token = authResponse.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      } else {
        return false;
      }
    }

    signOut() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/Sign-in']);
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
    }

    userIsLogged(): boolean {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          return true;
      } else {
        return false;
      }
    }
}
