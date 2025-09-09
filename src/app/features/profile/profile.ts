import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user: any = null;
  isEditing = false;
  selectedFile: File | null = null;

  constructor(private userService: User, private auth: Auth) {}

  ngOnInit(): void {
    const userId = this.auth.userId;
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        data => this.user = data,
        err => console.error(err)
      );
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.ngOnInit(); // reload original data
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveProfile() {
    if (!this.user) return;

    const formData = new FormData();
    for (let key in this.user) {
      if (this.user[key] !== null && this.user[key] !== undefined) {
        formData.append(key, this.user[key]);
      }
    }
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.userService.updateUser(this.user.user_id, formData).subscribe(
      updated => {
        this.user = updated;
        this.isEditing = false;
      },
      err => console.error(err)
    );
  }
}
