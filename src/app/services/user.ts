import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {


  private baseUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  updateUser(userId: number, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, data);
  }
}
