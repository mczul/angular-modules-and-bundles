import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegacyFourthComponent} from './legacy-fourth.component';

describe('LegacyFourthComponent', () => {
  let component: LegacyFourthComponent;
  let fixture: ComponentFixture<LegacyFourthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyFourthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
