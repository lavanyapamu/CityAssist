import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCase } from './file-case';

describe('FileCase', () => {
  let component: FileCase;
  let fixture: ComponentFixture<FileCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
