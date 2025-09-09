import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

}
