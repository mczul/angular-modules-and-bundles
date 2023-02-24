import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyFirstComponent } from './legacy-first.component';

describe('LegacyFirstComponent', () => {
  let component: LegacyFirstComponent;
  let fixture: ComponentFixture<LegacyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
