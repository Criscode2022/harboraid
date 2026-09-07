import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
export interface SessionUser { id: string; email: string; name: string; role: string; }
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<SessionUser | null>(this.readUser());
  token = signal<string | null>(localStorage.getItem('ha_token'));
  constructor(private http: HttpClient, private router: Router) {}
  login(email: string, password: string) {
    return this.http.post<{ accessToken: string; user: SessionUser }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((res) => this.store(res.accessToken, res.user)));
  }
  logout() {
    localStorage.removeItem('ha_token'); localStorage.removeItem('ha_user');
    this.token.set(null); this.user.set(null); void this.router.navigateByUrl('/login');
  }
  private store(token: string, user: SessionUser) {
    localStorage.setItem('ha_token', token); localStorage.setItem('ha_user', JSON.stringify(user));
    this.token.set(token); this.user.set(user);
  }
  private readUser(): SessionUser | null {
    const raw = localStorage.getItem('ha_user');
    return raw ? JSON.parse(raw) as SessionUser : null;
  }
}
