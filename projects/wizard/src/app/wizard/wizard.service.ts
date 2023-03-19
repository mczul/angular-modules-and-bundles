import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

export interface WizardStep {
  /**
   * Unique number of the wizard step
   */
  number: number;
  /**
   * A boolean flag that indicates whether this step and all its predecessors are considered valid
   */
  valid: boolean;
  /**
   * Emits a boolean value for {@link WizardStep#valid} whenever the validity changes.
   */
  validityChanges: Observable<boolean>;
  /**
   * A boolean flag that indicates whether the step is ready for editing (e.g. has been initialized)
   */
  ready: boolean;
  /**
   * Emits a boolean value for {@link WizardStep#ready} whenever the readiness changes.
   */
  readinessChanges: Observable<boolean>;
  /**
   * The title as displayed to the user
   */
  title: string;
}

/**
 * Manages the state of a general purpose wizard widget and ist scoped to a specific {@link WizardComponent}
 */
@Injectable({
  providedIn: null
})
export class WizardService {

  // --- Steps ------------------------------------------------------------------------------------

  protected _stepsCtrl$ = new BehaviorSubject<Readonly<WizardStep>[]>([]);
  protected _steps = this._stepsCtrl$.asObservable();

  /**
   * Emits all registered steps
   */
  get steps() {
    return this._steps;
  }

  get stepsSync() {
    return this._stepsCtrl$.value.slice();
  }

  // --- Selection --------------------------------------------------------------------------------

  protected _selectionCtrl$ = new BehaviorSubject<number | null>(null);
  protected _selected = this._selectionCtrl$.pipe(
    filter(selection => !!selection),
    distinctUntilChanged(),
  );

  /**
   * Emits the selected step number
   */
  get selected() {
    return this._selected;
  }

  get selectedSync() {
    return this._selectionCtrl$.value;
  }

  /**
   * Selects the {@link WizardStep} with the given step number (if it exists and does not have invalid predecessors)
   */
  select(stepNumber: number): void {
    // Step does not exist?
    if (!this.getSync(stepNumber)) {
      return;
    }
    const previous = this.getPreviousSync(stepNumber);
    const previousValid = !previous || this.isValidSync(previous.number);
    // step must exist and have valid previous step if present
    if (previousValid) {
      console.log(`[WizardService] selecting step #${stepNumber}.`);
      this._selectionCtrl$.next(stepNumber);
    }
  }

  /**
   * TODO
   */
  selectFirst(): void {
    const first = this.firstSync;
    if (!!first && this.isSelectableSync(first.number)) {
      this.select(first.number);
    }
  }

  /**
   * TODO: This will probably not work due to the async nature of the underlying initialization logic.
   *
   */
  selectLastSelectable(): void {
    const indexOfFirstNotSelectable = this.stepsSync.findIndex(step => !this.isSelectableSync(step.number));
    if (indexOfFirstNotSelectable > 0) {
      const lastSelectable = this.stepsSync[indexOfFirstNotSelectable - 1];
      this.select(lastSelectable.number);
    }
  }

  /**
   * Selects the previous {@link WizardStep} for the step with the given number (if it exists)
   */
  selectPrevious(stepNumber: number): void {
    const previous = this.getPreviousSync(stepNumber);
    if (!previous) {
      return;
    }
    this.select(previous.number);
  }

  /**
   * Selects the next {@link WizardStep} for the step with the given number (if it exists)
   */
  selectNext(stepNumber: number): void {
    const next = this.getNextSync(stepNumber);
    if (!next) {
      return;
    }
    this.select(next.number);
  }

  // --- First ------------------------------------------------------------------------------------

  protected _first = this._stepsCtrl$.pipe(
    filter(steps => steps?.length > 0 ?? false),
    map(steps => steps[0]),
    distinctUntilChanged(),
  );

  /**
   * Emits the currently first step.
   */
  get first() {
    return this._first;
  }

  get firstSync() {
    return this._stepsCtrl$.value[0];
  }

  // --- Last -------------------------------------------------------------------------------------

  protected _last = this._stepsCtrl$.pipe(
    filter(steps => steps?.length > 0 ?? false),
    map(steps => steps[steps.length - 1]),
    distinctUntilChanged(),
  );

  /**
   * Emits the currently last step.
   */
  get last() {
    return this._last;
  }

  get lastSync() {
    return this._stepsCtrl$.value[this._stepsCtrl$.value.length - 1];
  }

  // --- Validity & Readiness ---------------------------------------------------------------------

  /**
   * Return `true` if the {@link WizardStep} with the given number and all its predecessors are
   * valid or `false` otherwise.
   */
  isValidSync(stepNumber: number): boolean {
    // console.log(`[WizardService] isValidSync(${stepNumber}) called.`);
    const current = this.getSync(stepNumber);
    // if the step exists and is valid...
    if (!current?.valid) {
      return false;
    }
    const previous = this.getPreviousSync(stepNumber);
    // if no previous step present...
    if (!previous) {
      // ... must be first... and therefore valid
      return true;
    }
    // Recursively check predecessor validity
    return this.isValidSync(previous.number);
  }

  /**
   * Retruns `true` when the step with the given number is considered "selectable" or `false` otherwise.
   * A step is called "selectable" if it's the first step or all previous steps are valid.
   */
  isSelectableSync(stepNumber: number): boolean {
    const previous = this.getPreviousSync(stepNumber);
    // if no previous step present...
    if (!previous) {
      // ... must be first... and therefore selectable
      return true;
    }
    // console.log(`[WizardService] isSelectableSync(${stepNumber}) called.`, previous);
    return this.isValidSync(previous.number);
  }

  isPreviousReadySync(stepNumber: number): boolean {
    const previous = this.getPreviousSync(stepNumber);
    // if no previous step present...
    if (!previous) {
      // ... must be first... and therefore "ready"
      return true;
    }
    // console.log(`[WizardService] isPreviousReady(${stepNumber}) called.`, previous);
    return previous.ready;
  }

  // --- Access -----------------------------------------------------------------------------------

  /**
   * Returns the {@link WizardStep} with the given number or `undefined` if step number is unknown.
   */
  protected getSync(stepNumber: number): Readonly<WizardStep> | undefined {
    return this._stepsCtrl$.value.find(step => step.number === stepNumber);
  }

  /**
   * Returns the previous {@link WizardStep} of the step with the given number or `undefined`
   * if it does not exist.
   */
  protected getPreviousSync(stepNumber: number): Readonly<WizardStep> | undefined {
    const previousIndex = this._stepsCtrl$.value
      .map(step => step.number)
      .indexOf(stepNumber) - 1;
    if (previousIndex < 0) {
      return undefined;
    }
    return this.getSync(this._stepsCtrl$.value[previousIndex].number);
  }

  /**
   * Returns the next {@link WizardStep} of the step with the given number or `undefined`
   * if it does not exist.
   */
  protected getNextSync(stepNumber: number): Readonly<WizardStep> | undefined {
    const nextIndex = this._stepsCtrl$.value
      .map(step => step.number)
      .indexOf(stepNumber) + 1;
    if (nextIndex >= this._stepsCtrl$.value.length) {
      return undefined;
    }
    return this.getSync(this._stepsCtrl$.value[nextIndex].number);
  }

  // --- Registration -----------------------------------------------------------------------------

  /**
   * Registers the given {@link WizardStep} as part of the wizard
   */
  register(step: Readonly<WizardStep>): void {
    const foundIndex = this._stepsCtrl$.value
      .map(component => component.number)
      .indexOf(step.number);
    // create shallow copy to prevent side effects
    let newSteps = this._stepsCtrl$.value.slice();
    if (foundIndex === -1) {
      // append
      newSteps.push(step);
    } else {
      // update
      newSteps[foundIndex] = step;
    }
    // execute expensive tasks just once ;-)
    newSteps.sort((a, b) => a.number - b.number); // inplace!
    this._stepsCtrl$.next(newSteps);
    this._selectionCtrl$.next(newSteps[0].number);
  }

}
