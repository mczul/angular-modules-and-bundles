import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LegacyFirstComponent} from './legacy-first.component';
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";

describe('LegacyFirstComponent', () => {
  let component: LegacyFirstComponent;
  let fixture: ComponentFixture<LegacyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegacyFirstComponent],
      imports: [
        RouterModule,
        RouterTestingModule
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LegacyFirstComponent);
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
