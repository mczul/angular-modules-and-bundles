import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {WizardService} from "./wizard.service";
import {Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";
import {CommonModule} from "@angular/common";
export interface StepButtonConfig {
  show: boolean;
  caption: string;
  move: boolean;
  disabled: boolean;
}
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-step',
  template: `
    <ng-container *ngIf="active">
      <div *ngIf="showTopButtons"
           class="d-flex justify-content-between align-items-center"
           [ngClass]="{'justify-content-between': !isFirst, 'justify-content-end': isFirst}">
        <button class="btn btn-sm btn-outline-primary bda-round-button"
                *ngIf="!isFirst && previousStepButtonConfig.show && previousReady()"
                (click)="moveToPrevious()"
                [disabled]="previousStepButtonConfig.disabled">
          {{ previousStepButtonConfig.caption }}
        </button>
        <button class="btn btn-sm btn-outline-primary bda-round-button"
                [disabled]="!valid || !ready || nextStepButtonConfig.disabled"
                *ngIf="nextStepButtonConfig.show"
                (click)="nextStepButtonConfig.move ? moveToNext() : signalMoveNext()">
          {{ nextStepButtonConfig.caption }}
        </button>
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3 mb-2">
        <div class="w-100">
          <ng-content></ng-content>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center"
           [ngClass]="{'justify-content-between': !isFirst, 'justify-content-end': isFirst}">
        <button class="btn btn-sm btn-outline-primary bda-round-button"
                *ngIf="!isFirst && previousStepButtonConfig.show && previousReady()"
                (click)="moveToPrevious()"
                [disabled]="previousStepButtonConfig.disabled">
          {{ previousStepButtonConfig.caption }}
        </button>
        <button class="btn btn-sm btn-outline-primary bda-round-button"
                [disabled]="!valid || !ready || nextStepButtonConfig.disabled"
                *ngIf="nextStepButtonConfig.show"
                (click)="nextStepButtonConfig.move ? moveToNext() : signalMoveNext()">
          {{ nextStepButtonConfig.caption }}
        </button>
      </div>
    </ng-container>
  `,
  styles: []
})
export class StepComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private _number: number = -1;
  private _previousStepButtonConfig: StepButtonConfig = {
    caption: 'zurück',
    show: true,
    move: true,
    disabled: false
  };
  private _nextStepButtonConfig: StepButtonConfig = {
    caption: 'weiter',
    show: true,
    move: true,
    disabled: false
  };

  /**
   * Flag, das `true` ist, sofern es sich um den ersten Step in Registrierungsreihenfolge handelt.
   */
  isFirst = true;
  /**
   * Flag, das `true` ist, sofern es sich um den letzten Step in Registrierungsreihenfolge handelt.
   */
  isLast = false;

  /**
   * Emittiert diesen Step beim Klick auf den "weiter"-Button.
   */
  @Output()
  next = new EventEmitter<StepComponent>();

  /**
   * Identifizierende Nummer des Step. Ein Setzen des Wertes führt zur Registrierung beim `WizardService`.
   */
  @Input()
  set number(value: number) {
    this._number = value;
    this.wizardService.register(this);
  };

  get number() {
    return this._number;
  }

  /**
   * Zeichenkette, die als Überschrift des Step angezeigt werden soll.
   */
  @Input()
  title: string = '[???]';

  /**
   * Ist dieser Step derzeit aktiv ausgewählt?
   */
  active: boolean = false;

  /**
   * Ist dieser Step gültig "abgearbeitet"?
   */
  @Input()
  valid: boolean = false;

  /**
   * Ist dieser Step zur Bearbeitung bereit?
   */
  @Input()
  ready: boolean = true;

  /**
   * Soll auch die obere Navigationsleiste (mit z.B. "weiter"- & "zurück"-Buttons) angezeigt werden?
   */
  @Input()
  showTopButtons: boolean = false;

  /**
   * Konfiguration des "zurück"-Buttons im aktuellen Step.
   * @param value die Konfigurationsparameter, die gesetzt werden sollen.
   */
  @Input()
  set previousStepButtonConfig(value: Partial<StepButtonConfig>) {
    this._previousStepButtonConfig = {
      ...this._previousStepButtonConfig,
      ...value
    };
  }

  get previousStepButtonConfig() {
    return this._previousStepButtonConfig;
  }

  /**
   * Konfiguration des "weiter"-Buttons im aktuellen Step.
   * @param value die Konfigurationsparameter, die gesetzt werden sollen.
   */
  @Input()
  set nextStepButtonConfig(value: Partial<StepButtonConfig>) {
    this._nextStepButtonConfig = {
      ...this._nextStepButtonConfig,
      ...value
    };
  }

  get nextStepButtonConfig() {
    return this._nextStepButtonConfig;
  }

  constructor(private wizardService: WizardService) {
  }

  ngOnInit(): void {
    this.wizardService.selected
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (stepNumber) => {
          this.active = stepNumber === this.number;
        }
      );

    // Erster Schritt?
    this.wizardService.steps
      .pipe(
        takeUntil(this.unsubscribe$),
        map((steps) => WizardService.isFirst(steps, this.number))
      )
      .subscribe(
        (first) => this.isFirst = first
      );

    // Letzter Schritt?
    this.wizardService.steps
      .pipe(
        takeUntil(this.unsubscribe$),
        map((steps) => WizardService.isLast(steps, this.number))
      )
      .subscribe(
        (last) => this.isLast = last
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Selektiert den Vorgänger-Schritt.
   */
  moveToPrevious(): void {
    if (this.previousStepButtonConfig.move) {
      this.wizardService.selectPrevious(this.number);
    }
  }

  /**
   * Emittiert diesen Schritt zur Signalisierung des Klicks auf den "weiter"-Button.
   */
  signalMoveNext(): void {
    this.next.emit(this);
  }

  /**
   * Navigiert über den WizardService zum nächsten Schritt.
   * @param emit boolsches Flag, das festlegt, ob das `next`-Event emittiert werden soll.
   */
  moveToNext(emit: boolean = true): void {
    if (emit) {
      this.signalMoveNext();
    }
    this.wizardService.selectNext(this.number);
  }

  /**
   * Liefert `true`, sofern der Vorgänger-Schritt bereit zur Bearbeitung ist.
   */
  previousReady(): boolean {
    const previous = this.wizardService.getPrevious(this.number);
    if (!previous) {
      return false;
    }
    return previous.ready;
  }

}
