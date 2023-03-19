import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WizardService, WizardStep} from './wizard.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CommonModule} from "@angular/common";

/**
 * Represents the configuration for wizard step buttons.
 */
export interface WizardStepButtonConfig {
  // show the button?
  show: boolean;
  // button caption?
  caption: string;
  // actually select step or just signal that a move was requested?
  move: boolean;
  // disable the button?
  disabled: boolean;
}

/**
 * Provides a generic wrapper for arbitrary content.
 */
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss'],
})
export class WizardStepComponent implements WizardStep, OnInit, OnDestroy {
  protected _unsubscribe$ = new Subject<void>();
  protected _number!: number;

  // --- Button configuration ---------------------------------------------------------------------

  @Input()
  showTopButtons = false;

  protected _previousStepButtonConfig: WizardStepButtonConfig = {
    caption: '<<',
    show: true,
    move: true,
    disabled: false,
  };
  @Input()
  set previousStepButtonConfig(value: Partial<WizardStepButtonConfig>) {
    this._previousStepButtonConfig = {
      ...this._previousStepButtonConfig,
      ...value
    };
  }

  get previousStepButtonConfig() {
    return this._previousStepButtonConfig;
  }

  protected _nextStepButtonConfig: WizardStepButtonConfig = {
    caption: '>>',
    show: true,
    move: true,
    disabled: false,
  };
  @Input()
  set nextStepButtonConfig(value: Partial<WizardStepButtonConfig>) {
    this._nextStepButtonConfig = {
      ...this._nextStepButtonConfig,
      ...value
    };
  }

  get nextStepButtonConfig() {
    return this._nextStepButtonConfig;
  }

  protected moveToPrevious(): void {
    this.wizardService.selectPrevious(this.number);
  }

  protected signalMovePrevious(): void {
    this.previous.emit(this);
  }

  protected moveToNext(): void {
    this.wizardService.selectNext(this.number);
  }

  protected signalMoveNext(): void {
    this.next.emit(this);
  }

  // --- State ------------------------------------------------------------------------------------

  protected isFirst = false; // initialized via service
  protected isLast = false; // initialized via service
  protected isActive = false; // initialized via service

  protected _validityCtrl$ = new BehaviorSubject<boolean>(true);
  // TODO: distinctUntilChanged?
  protected _validityChanges = this._validityCtrl$.asObservable();
  protected _readinessCtrl$ = new BehaviorSubject<boolean>(true);
  // TODO: distinctUntilChanged?
  protected _readinessChanges = this._readinessCtrl$.asObservable();

  /**
   * As described in {@link WizardStep}
   */
  @Input()
  set valid(value: boolean) {
    this._validityCtrl$.next(value);
  }
  get valid() {
    return this._validityCtrl$.getValue();
  }
  get validityChanges() {
    return this._validityChanges;
  }

  /**
   * A boolean flag that indicates whether the step is ready for editing (e.g. has been initialized)
   */
  @Input()
  set ready(value: boolean) {
    this._readinessCtrl$.next(value);
  }
  get ready() {
    return this._readinessCtrl$.getValue();
  }
  get readinessChanges() {
    return this._readinessChanges;
  }

  @Input()
  title!: string;

  /**
   * As described in {@link WizardStep}
   */
  @Input()
  set number(value: number) {
    this._number = value;
    this.wizardService.register(this);
  }

  get number() {
    return this._number;
  }

  // --- Events -----------------------------------------------------------------------------------

  @Output()
  previous = new EventEmitter<WizardStep>();

  @Output()
  next = new EventEmitter<WizardStep>();

  constructor(protected wizardService: WizardService) {
  }

  ngOnInit(): void {
    // is selected?
    this.wizardService.selected.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe({
      next: selected => this.isActive = this.number === selected,
    });

    // is first?
    this.wizardService.first.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe({
      next: first => this.isFirst = this.number === first.number,
    });

    // is last?
    this.wizardService.last.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe({
      next: last => this.isLast = this.number === last.number,
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  protected handleNextButtonClick(): void {
    this.signalMoveNext();
    if (this.nextStepButtonConfig.move) {
      this.moveToNext();
    }
  }

  protected handlePreviousButtonClick(): void {
    this.signalMovePrevious();
    if (this.previousStepButtonConfig.move) {
      this.moveToPrevious();
    }
  }
}
