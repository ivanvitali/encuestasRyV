import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VihStatisticsComponent } from './vih-statistics.component';

describe('VihStatisticsComponent', () => {
  let component: VihStatisticsComponent;
  let fixture: ComponentFixture<VihStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VihStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VihStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
