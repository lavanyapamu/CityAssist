import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.http.post('http://localhost:5000/users/login', this.loginForm.value)
      .subscribe({
        next: (res: any) => {
      
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user_id', res.user_id);
          localStorage.setItem('role', res.role);

          
          if (res.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message || 'Login failed');
        }
      });
  }
   goRegister() {
  this.router.navigate(['/register']);
}
}
