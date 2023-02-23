import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacySecondComponent } from './legacy-second.component';

describe('LegacySecondComponent', () => {
  let component: LegacySecondComponent;
  let fixture: ComponentFixture<LegacySecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacySecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacySecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
