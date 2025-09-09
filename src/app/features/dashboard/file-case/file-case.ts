import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-a-case',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './file-case.html',
  styleUrls: ['./file-case.css']
})
export class FileCase implements OnInit {
  selectedFile: File | null = null;

  caseForm: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.caseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      category_id: ['', Validators.required],
       user_id: ['']  
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.initializeUserId();
    this.loadCategories();
    
  }
  
  private initializeUserId() {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.caseForm.patchValue({ user_id: Number(storedUserId) });
    } else {
      console.error('No user_id found in localStorage');
      alert('User not logged in. Please login first.');
    }}
  loadCategories() {
    this.http.get<any[]>('http://localhost:5000/case/category/all')
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Error loading categories', err);
          alert('Failed to load categories');
        }
      });
  }


  submitCase() {
    if (!this.caseForm.valid) return;

    const formData = new FormData();
    Object.entries(this.caseForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.http.post('http://localhost:5000/case/add', formData)
      .subscribe({
        next: res => {
          alert('Case filed successfully!');
          this.caseForm.reset();
        },
        error: err => {
          console.error(err);
          alert(err.error?.message || 'Error filing case');
        }
      });

  }
}
