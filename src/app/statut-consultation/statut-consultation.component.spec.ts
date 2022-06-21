import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutConsultationComponent } from './statut-consultation.component';

describe('StatutConsultationComponent', () => {
  let component: StatutConsultationComponent;
  let fixture: ComponentFixture<StatutConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
