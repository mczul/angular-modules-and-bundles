import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WizardComponent} from './wizard.component';
import {WizardStep} from './wizard.service';
import {WizardStepComponent} from './wizard-step.component';

@Component({
  standalone: true,
  imports: [WizardComponent, WizardStepComponent],
  selector: 'test-wizard-host',
  template: `
    <app-wizard>
      <app-wizard-step [number]="steps[1].number" [title]="steps[1].title" [valid]="steps[1].valid"
                       [ready]="steps[1].ready">
        <article id="step_{{ steps[1].number }}_content">My fancy step content</article>
      </app-wizard-step>
      <app-wizard-step [number]="steps[0].number" [title]="steps[0].title" [valid]="steps[0].valid"
                       [ready]="steps[0].ready">
        <article id="step_{{ steps[0].number }}_content">My fancy step content</article>
      </app-wizard-step>
      <app-wizard-step [number]="steps[2].number" [title]="steps[2].title" [valid]="steps[2].valid"
                       [ready]="steps[2].ready">
        <article id="step_{{ steps[2].number }}_content">My fancy step content</article>
      </app-wizard-step>
    </app-wizard>
  `,
  styles: [],
})
class WizardHost {
  steps: WizardStep[] = [
    {number: 2, title: 'Second step', valid: true, ready: true},
    {number: 1, title: 'First step', valid: true, ready: true},
    {number: 3, title: 'Third step', valid: true, ready: true},
  ];
}

interface WizardExpectation {
  title: string,
  state: ReadonlyArray<{
    number: number,
    modifications: Partial<Omit<WizardStep, 'number'>>,
  }>,
  select: number,
  checks: ReadonlyArray<{
    selector: string,
    present: boolean
  }>
}

describe('WizardComponent', () => {
  let component: WizardHost;
  let expectedSteps: readonly WizardStep[];
  let fixture: ComponentFixture<WizardHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardHost],
    })
      .compileComponents();

    fixture = TestBed.createComponent(WizardHost);
    component = fixture.componentInstance;
    // TODO: Check for better alternatives
    expectedSteps = component.steps.slice()
      .sort((a, b) => a.number - b.number);
    fixture.detectChanges();
  });

  const expectations: ReadonlyArray<WizardExpectation> = [
    {
      title: 'select first step while invalid',
      state: [
        {number: 1, modifications: {valid: false}}
      ],
      select: 1,
      checks: [
        {selector: '#step_1_content', present: true},
        {selector: '#step_2_content', present: false},
      ],
    },
    {
      title: 'select second step while first one is invalid',
      state: [
        {number: 1, modifications: {valid: false}}
      ],
      select: 2,
      checks: [
        {selector: '#step_2_content', present: false},
        {selector: '#step_1_content', present: true},
      ],
    },
    {
      title: 'select second step while first one is valid',
      state: [],
      select: 2,
      checks: [
        {selector: '#step_2_content', present: true},
        {selector: '#step_1_content', present: false},
      ],
    },
    {
      title: 'select third step while first one is invalid',
      state: [
        {number: 1, modifications: {valid: false}},
      ],
      select: 3,
      checks: [
        {selector: '#step_3_content', present: false},
        {selector: '#step_1_content', present: true},
      ],
    },
    {
      title: 'select third step while previous are valid',
      state: [],
      select: 3,
      checks: [
        {selector: '#step_3_content', present: true},
        {selector: '#step_1_content', present: false},
      ],
    },
  ];

  expectations.forEach(expectation => {

    it(`must match expectation "${expectation.title}"`, () => {
      // given
      // ... do state modifications
      expectation.state.forEach(update => {
        const stepIndex = component.steps.findIndex(step => step.number === update.number);
        component.steps[stepIndex] = {...component.steps[stepIndex], ...update.modifications};
      });
      fixture.detectChanges();

      // when
      // ... click wizard step button
      const stepButtonToClick = fixture.nativeElement.querySelector(`button[data-step-number="${expectation.select}"]`);
      expect(stepButtonToClick).withContext(`Step button not found`).not.toBeFalsy();
      stepButtonToClick.click();
      fixture.detectChanges();

      // then
      expectation.checks.forEach(check => {
        if (check.present) {
          expect(fixture.nativeElement.querySelector(check.selector)).withContext(`Failed to find expected DOM node for selector "${check.selector}"!`).toBeTruthy();
        } else {
          expect(fixture.nativeElement.querySelector(check.selector)).withContext(`Unexpected DOM node found for selector "${check.selector}"!`).toBeFalsy();
        }
      });

    });

  });

  it('must render header buttons for all steps in correct order and show first step content without explicit selection', () => {
    // given
    const expectedActiveStep = expectedSteps[0];

    // when
    const actualButtons = fixture.debugElement.nativeElement.querySelectorAll('.sm-wizard__button--step');

    // then
    // ... number of steps?
    expect(actualButtons.length).toEqual(expectedSteps.length);
    for (let i = 0; i < actualButtons.length; i++) {
      const actualButton = actualButtons[i];
      const expectedStep = expectedSteps[i];
      // ... step header button
      //  -> correct number shown?
      expect(actualButton.textContent).toContain(expectedStep.number);
      //  -> correct title shown?
      expect(actualButton.textContent).toContain(expectedStep.title);
      // ... step content
      const actualContent = fixture.debugElement.nativeElement.querySelector(`#step_${expectedStep.number}_content`);
      if (expectedStep.number === expectedActiveStep.number) {
        // ... first step must be active
        expect(actualContent).toBeTruthy();
      } else {
        // ... second to last step must be inactive
        expect(actualContent).toBeFalsy();
      }
    }
  });
});
