import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneSecondComponent } from './standalone-second.component';

describe('StandaloneSecondComponent', () => {
  let component: StandaloneSecondComponent;
  let fixture: ComponentFixture<StandaloneSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StandaloneSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandaloneSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
