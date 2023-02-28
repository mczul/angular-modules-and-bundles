import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {StepComponent} from "./step.component";

/**
 * Dient der komponentenübergreifenden Verwaltung des Wizard-State und ist daher nur exklusiv im Kontext einer
 * `WizardComponent` verfügbar.
 */
@Injectable({
  // Scope wird durch Wizard definiert
  providedIn: null
})
export class WizardService {
  private steps$ = new BehaviorSubject<StepComponent[]>([]);
  private selectedStep$ = new BehaviorSubject<number | null>(null);

  constructor() {
  }

  /**
   * Ermittelt den Index des Steps mit der angegebenen Nummer nach Registrierungsreihenfolge.
   * Wirft einen Fehler, sofern der Step nicht gefunden werden konnte.
   * @param stepNumber die eindeutige Nummer des Steps, dessen Index ermittelt werden soll.
   */
  private getIndex(stepNumber: number): number {
    const index = this.steps$.value
      .map((current) => current.number)
      .indexOf(stepNumber);
    // Nicht gefunden
    if (index === -1) {
      throw new Error(`Step ${stepNumber} not found`);
    }
    return index;
  }

  /**
   * Ermittelt den Step mit der angegebenen Nummer.
   * @param stepNumber die eindeutige Nummer des zu ermittelnden Steps.
   */
  get(stepNumber: number): StepComponent {
    return this.steps$.value[this.getIndex(stepNumber)];
  }

  /**
   * Emittiert die eindeutige Nummer des ausgewählten Steps oder `null`, sofern kein Step ausgewählt ist.
   */
  get selected(): Observable<number | null> {
    return this.selectedStep$.asObservable();
  }

  /**
   * Emittiert alle registrierten Steps.
   */
  get steps(): Observable<StepComponent[]> {
    return this.steps$.asObservable();
  }


  /**
   * Registriert eine `StepComponent` als Bestandteil des Wizards. Sollte bereits zuvor
   * ein Step mit der entsprechenden Nummer registriert, so wird der bestehende Step ersetzt.
   * @param step die Step-Komponente, die dem Wizard hinzugefügt werden soll.
   */
  register(step: StepComponent): void {
    const foundIndex = this.steps$.value
      .map((step) => step.number)
      .indexOf(step.number);
    const steps = this.steps$.value;
    if (foundIndex === -1) {
      steps.push(step);
    } else {
      steps[foundIndex] = step;
    }
    this.steps$.next(steps);
  }

  /**
   * Selektiert den Step mit der angegebenen Nummer.
   * @param stepNumber die eindeutige Nummer des selektierten Steps.
   */
  select(stepNumber: number): void {
    this.selectedStep$.next(stepNumber);
  }

  /**
   * Ermittelt, ob der Step mit der angegebenen Nummer der derzeit ERSTE nach Registrierungsfolge ist.
   * @param steps die Liste aller Steps in der Registrierungsreihenfolge.
   * @param stepNumber die eindeutige Nummer des zu prüfenden Steps.
   */
  static isFirst(steps: StepComponent[], stepNumber: number): boolean {
    return steps
      .map((current) => current.number)
      .indexOf(stepNumber) === 0;
  }

  /**
   * Ermittelt, ob der Step mit der angegebenen Nummer der derzeit LETZTE nach Registrierungsfolge ist.
   * @param steps die Liste aller Steps in der Registrierungsreihenfolge.
   * @param stepNumber die eindeutige Nummer des zu prüfenden Steps.
   */
  static isLast(steps: StepComponent[], stepNumber: number): boolean {
    return steps
      .map((current) => current.number)
      .indexOf(stepNumber) === steps.length - 1;
  }

  /**
   * Selektiert den vorherigen Step.
   * @param stepNumber die eindeutige Nummer des aktuellen Steps, dessen Vorgänger selektiert werden soll.
   */
  selectPrevious(stepNumber: number): void {
    const previous = this.getPrevious(stepNumber);
    if (!!previous) {
      this.select(previous.number);
    }
  }

  /**
   * Ermittelt den nächsten Step.
   * @param stepNumber die eindeutige Nummer des aktuellen Steps, dessen Vorgänger ermittelt werden soll.
   */
  getPrevious(stepNumber: number): StepComponent | null {
    const currentIndex = this.getIndex(stepNumber);
    // aktueller Schritt ist bereits der erste Eintrag
    if (currentIndex === 0) {
      return null;
    }
    return this.steps$.value[currentIndex - 1];
  }

  /**
   * Selektiert den nächsten Step.
   * @param stepNumber die eindeutige Nummer des aktuellen Steps, dessen Nachfolger selektiert werden soll.
   */
  selectNext(stepNumber: number): void {
    const next = this.getNext(stepNumber);
    if (!!next) {
      this.select(next.number);
    }
  }

  /**
   * Ermittelt den nächsten Step.
   * @param stepNumber die eindeutige Nummer des aktuellen Steps, dessen Nachfolger ermittelt werden soll.
   */
  getNext(stepNumber: number): StepComponent | null {
    const currentIndex = this.getIndex(stepNumber);
    // aktueller Schritt ist bereits der letzte Eintrag
    if (currentIndex === this.steps$.value.length - 1) {
      return null;
    }
    return this.steps$.value[currentIndex + 1];
  }

  /**
   * Ermittelt, ob der Step mit der angegebenen Nummer und all seine Vorgänger valide sind.
   * @param stepNumber die eindeutige Nummer des zu prüfenden Step.
   */
  isValid(stepNumber: number): boolean {
    const current = this.get(stepNumber);
    const previous = this.getPrevious(stepNumber);
    if (!current.valid) {
      return false;
    }
    if (!previous) {
      return true;
    }
    // TODO: Optionale Schritte berücksichtigen
    return this.isValid(previous.number);
  }

  /**
   * Ermittelt, ob der Step mit der angegebenen Nummer für die Bearbeitung bereit ist.
   * @param stepNumber die eindeutige Nummer des zu prüfenden Steps.
   */
  isReady(stepNumber: number): boolean {
    const current = this.get(stepNumber);
    return current.ready;
  }
}
