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
   constructor(private router: Router) {}
    logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear(); // removes all localStorage keys
      this.router.navigate(['login']);
    }
  }
}
