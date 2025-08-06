import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ILoginRequest } from '@interfaces/auth/login-request.interface';
import { ILoginResponse } from '@interfaces/auth/login-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl + '/auth';

  login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.baseUrl}/login`, data);
  }

  logout(): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/logout`);
  }

  refreshTokens(): Observable<ILoginResponse> {
    return this.httpClient.get<ILoginResponse>(`${this.baseUrl}/refresh-tokens`);
  }
}
