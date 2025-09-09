import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editcase } from './editcase';

describe('Editcase', () => {
  let component: Editcase;
  let fixture: ComponentFixture<Editcase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editcase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editcase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
