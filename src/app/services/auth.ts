import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  get role(): string | null {
    return localStorage.getItem('role');
  }

  get userId(): number | null {
    const id = localStorage.getItem('user_id');
    return id ? Number(id) : null;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
   localStorage.removeItem('access_token');
  localStorage.removeItem('role');
  localStorage.removeItem('user_id');
  
  }
}
