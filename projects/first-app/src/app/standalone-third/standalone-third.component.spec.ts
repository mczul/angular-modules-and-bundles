import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StandaloneThirdComponent} from './standalone-third.component';

describe('StandaloneThirdComponent', () => {
  let component: StandaloneThirdComponent;
  let fixture: ComponentFixture<StandaloneThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandaloneThirdComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StandaloneThirdComponent);
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
