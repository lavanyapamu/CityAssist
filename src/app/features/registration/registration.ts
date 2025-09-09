import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'] 
})
export class Registration {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone_number: ['', Validators.required],
      colony: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  selectRole(roleName: string) {
    this.registerForm.patchValue({ role: roleName });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.http.post('http://localhost:5000/users/register', this.registerForm.value)
      .subscribe({
        next: (res) => {
          alert('Registered successfully!');
          this.registerForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message || 'Registration failed');
        }
      });
  }
  goToLogin() {
  this.router.navigate(['/login']);
}
}
