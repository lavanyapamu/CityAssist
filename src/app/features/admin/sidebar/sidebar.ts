import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
      constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();         // Clear user auth data
    this.router.navigate(['/login']); // Redirect to login page
  }

  isAdmin(): boolean {
    return this.auth.role === 'admin';
  }

}
