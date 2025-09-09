import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editcase',
  imports: [CommonModule, FormsModule],
  templateUrl: './editcase.html',
  styleUrls: ['./editcase.css']
})
export class Editcase implements OnInit {
  case: any = {};
  categories: any[] = [];
  selectedFile: File | null = null;
  caseId: number = 0;
  isEditMode: boolean = false; 

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caseId = +this.route.snapshot.paramMap.get('case_id')!;
    const mode = this.route.snapshot.queryParamMap.get('mode');
    this.isEditMode = mode === 'edit';
    this.loadCase();
    this.loadCategories();
    
  }

  loadCase() {
    this.http.get<any>(`http://localhost:5000/case/${this.caseId}`)
      .subscribe({
        next: data => this.case = data,
        error: err => console.error('Error fetching case:', err)
      });
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:5000/case/category/all')
      .subscribe({
        next: data => this.categories = data,
        error: err => console.error('Error loading categories', err)
      });
  }

 

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  enableEdit() {
    this.isEditMode = true;
  }

  updateCase() {
    const formData = new FormData();
    formData.append('title', this.case.title);
    formData.append('description', this.case.description);
    formData.append('category_id', this.case.category_id);
    formData.append('status_id', this.case.status_id);
    formData.append('location', this.case.location || '');
    if (this.selectedFile) formData.append('photo', this.selectedFile);

    this.http.put(`http://localhost:5000/case/update/${this.caseId}`, formData)
      .subscribe({
        next: () => this.router.navigate(['/dashboard/cases']),
        error: err => console.error('Error updating case:', err)
      });
  }

  cancel() {
    this.router.navigate(['/dashboard/cases']);
  }
}
