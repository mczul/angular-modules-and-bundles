import {AfterContentInit, Component, ContentChildren, OnDestroy, OnInit, QueryList} from '@angular/core';
import {WizardService} from "./wizard.service";
import {StepComponent} from "./step.component";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-wizard',
  template: `
    <div class="wizard">
      <div class="wizard__header">
        <button *ngFor="let step of steps"
                class="btn"
                [ngClass]="{'btn--primary': step.number === selectedStepNumber, 'btn--secondary': step.number !== selectedStepNumber}"
                [disabled]="invalid(previous(step)) || !step.ready"
                (click)="select(step.number)">
        <span class="badge badge--pill"
              style="width: 3em;">{{ step.number }}</span>
          <span>
          {{ step.title }}
        </span>
        </button>
      </div>

      <div class="wizard__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 0.5em;
    }
  `],
  providers: [
    WizardService
  ]
})
export class WizardComponent implements OnInit, OnDestroy, AfterContentInit {
  private unsubscribe$ = new Subject<void>();

  @ContentChildren(StepComponent)
  steps!: QueryList<StepComponent>;
  selectedStepNumber: number | null = null;

  constructor(private wizardService: WizardService) {
  }

  ngOnInit(): void {
    this.wizardService.selected
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (stepNumber) => this.selectedStepNumber = stepNumber
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterContentInit(): void {
    const firstStep = this.steps.get(0);
    // Wenn keine Steps verfügbar sind, Auswahl überspringen.
    if (!firstStep) {
      return;
    }
    this.select(firstStep.number);
  }

  select(stepNumber: number): void {
    this.wizardService.select(stepNumber);
  }

  previous(step: StepComponent): StepComponent | null {
    return this.wizardService.getPrevious(step.number);
  }

  invalid(step: StepComponent | null): boolean {
    if (step === null) {
      // Nicht vorhandene Schritte sind nie ungültig ;-)
      return false;
    }
    return !this.wizardService.isValid(step.number);
  }

}
