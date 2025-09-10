import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.css']
})
export class Sidenav {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
