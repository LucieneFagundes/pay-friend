import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { env } from 'src/environments/environments';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl = `${env.baseUrl}/account`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}?email=${email}`);
  }

  create({ email, password }: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, { email, password });
  }

  update({ id, email, password }: User): Observable<User> {
    return this.http.patch<User>(`${this.userUrl}/${id}`, { email, password });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.userUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error ao excluir a conta: ', error);
        return throwError(
          () => 'Erro ao excluir a conta. Por favor, tente novamente mais tarde'
        );
      })
    );
  }
}
