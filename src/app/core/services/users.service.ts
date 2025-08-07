import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { IUser } from '@interfaces/user/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl + '/users';

  getCurrentUser(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/me`);
  }
}
