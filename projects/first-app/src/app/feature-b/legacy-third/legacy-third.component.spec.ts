import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegacyThirdComponent} from './legacy-third.component';
import {LegacyFourthComponent} from "../legacy-fourth/legacy-fourth.component";
import {StandaloneSecondComponent} from "../../standalone-second/standalone-second.component";

describe('LegacyThirdComponent', () => {
  let component: LegacyThirdComponent;
  let fixture: ComponentFixture<LegacyThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegacyThirdComponent, LegacyFourthComponent],
      imports: [StandaloneSecondComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LegacyThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('must create', () => {
    // given
    // when
    // then
    expect(component).toBeTruthy();
  });
});
