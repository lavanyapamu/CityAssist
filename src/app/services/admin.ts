import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  private baseUrl = 'http://localhost:5000/case';

  constructor(private http: HttpClient) {}

  getAllCases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getAllStatuses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/status/all`);
  }

  updateCaseStatus(caseId: number, statusId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/status/${caseId}`, { status_id: statusId });
  }
}
