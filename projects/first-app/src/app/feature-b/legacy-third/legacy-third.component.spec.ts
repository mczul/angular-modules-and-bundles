import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegacyThirdComponent} from './legacy-third.component';

describe('LegacyThirdComponent', () => {
  let component: LegacyThirdComponent;
  let fixture: ComponentFixture<LegacyThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyThirdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
