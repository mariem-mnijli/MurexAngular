import { TestBed } from '@angular/core/testing';

import { StatutConsultationService } from './statut-consultation.service';

describe('StatutConsultationService', () => {
  let service: StatutConsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutConsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
