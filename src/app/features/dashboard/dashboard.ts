import { Component } from '@angular/core';
import { RouterEvent, RouterOutlet } from '@angular/router';
import { Sidenav } from './sidenav/sidenav';   // ✅ correct import


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterOutlet, Sidenav],
  templateUrl: './dashboard.html',
 styleUrls: ['./dashboard.css']

})
export class Dashboard {

}
