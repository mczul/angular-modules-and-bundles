import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StepComponent} from './step.component';
import {WizardService} from "./wizard.service";

describe('StepComponent', () => {
  let component: StepComponent;
  let fixture: ComponentFixture<StepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepComponent],
      providers: [WizardService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
