import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiURL = 'http://localhost:8081/api'; // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/auth/login`, {
      username,
      password,
    });
  }

  signup(
    username: string,
    password: string,
    name: string,
    surname: string,
    agentid: string
  ): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/auth/signup`, {
      username,
      password,
      name,
      surname,
      agentid,
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.roles || [];
    }
    return [];
  }

  getName(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.name || '';
    }
    return '';
  }

  getSurname(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.surname || '';
    }
    return '';
  }

  getImage(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.image || '';
    }
    return '';
  }

  getAgentId(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.agentid || '';
    }
    return '';
  }

  // Performances API calls
  getPerformances(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiURL}/performances`, { headers });
  }

  addPerformance(performance: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiURL}/performances`, performance, {
      headers,
    });
  }

  updatePerformance(id: number, performance: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(
      `${this.apiURL}/performances/${id}`,
      performance,
      { headers }
    );
  }

  deletePerformance(id: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiURL}/performances/${id}`, {
      headers,
    });
  }

  filterPerformances(startDate: string, endDate: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<any>(`${this.apiURL}/performances/filter`, {
      headers,
      params,
    });
  }
}
