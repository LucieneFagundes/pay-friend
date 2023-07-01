import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, private userService: UserService) {}

  login(credentials: Credentials): void {
    this.userService
      .getByEmail(credentials.email)
      .pipe(
        map((res: any) => {
          if (res[0] && res[0].password === credentials.password) {
            return res;
          } else {
            throw new Error(
              'Email or password incorrect. Please try again later.'
            );
          }
        }),
        map((res) => {
          localStorage.setItem('token', credentials.email);
          this.updatedLoggedIn();
          return res;
        }),
        catchError((error) => {
          console.error(error);
          throw new Error('An error occurred. Please try again later.');
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updatedLoggedIn();
    this.router.navigate(['login']);
  }

  updatedLoggedIn(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }
}
