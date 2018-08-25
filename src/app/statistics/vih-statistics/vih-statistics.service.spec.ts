import { TestBed, inject } from '@angular/core/testing';

import { VihStatisticsService } from './vih-statistics.service';

describe('VihStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VihStatisticsService]
    });
  });

  it('should be created', inject([VihStatisticsService], (service: VihStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
