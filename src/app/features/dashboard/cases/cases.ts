import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';




@Component({
  selector: 'app-user-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases.html',
  styleUrls: ['./cases.css']
})
export class Cases implements OnInit {
  cases: any[] = [];
  userId!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = this.auth.userId;
    if (userId) {
      this.userId = userId;
      this.loadUserCases();
    } else {
      console.error('No user_id found');
      this.router.navigate(['/login']);
    }
  }

  loadUserCases() {
    this.http.get<any[]>(`http://localhost:5000/case/mycases/${this.userId}`)
      .subscribe({
        next: data => this.cases = data,
        error: err => console.error('Error fetching cases:', err)
      });
  }

  editCase(caseItem: any) {
    this.router.navigate(['dashboard/editcase', caseItem.case_id]);
  }

  deleteCase(caseId: number) {
    if (confirm('Are you sure you want to delete this case?')) {
      this.http.delete(`http://localhost:5000/case/delete/${caseId}`)
        .subscribe({
          next: () => {
            this.cases = this.cases.filter(c => c.case_id !== caseId);
          },
          error: err => console.error('Error deleting case:', err)
        });
    }
  }
}
