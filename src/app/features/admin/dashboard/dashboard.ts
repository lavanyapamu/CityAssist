import { Component } from '@angular/core';
import { Admin } from '../../../services/admin';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class aDashboard {
        cases: any[] = [];
  statuses: any[] = [];

  constructor(private admin: Admin, private auth: Auth) {}

  ngOnInit(): void {
    this.loadCases();
    this.loadStatuses();
  }

  loadCases() {
    this.admin.getAllCases().subscribe(
      (data: any) => this.cases = data,
      err => console.error(err)
    );
  }

  loadStatuses() {
    this.admin.getAllStatuses().subscribe(
      (data: any) => this.statuses = data,
      err => console.error(err)
    );
  }

  updateStatus(caseItem: any) {
    this.admin.updateCaseStatus(caseItem.case_id, caseItem.status_id).subscribe(
      updated => alert('Status updated successfully'),
      err => console.error(err)
    );
  }

  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
