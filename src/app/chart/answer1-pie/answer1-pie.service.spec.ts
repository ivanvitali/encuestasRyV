import { TestBed, inject } from '@angular/core/testing';

import { Answer1PieService } from './answer1-pie.service';

describe('Answer1PieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Answer1PieService]
    });
  });

  it('should be created', inject([Answer1PieService], (service: Answer1PieService) => {
    expect(service).toBeTruthy();
  }));
});
