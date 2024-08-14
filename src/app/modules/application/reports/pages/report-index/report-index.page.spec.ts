import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportIndexPage } from './report-index.page';

describe('ReportIndexPage', () => {
  let component: ReportIndexPage;
  let fixture: ComponentFixture<ReportIndexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
