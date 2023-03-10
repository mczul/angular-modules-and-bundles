import {Component} from '@angular/core';
import {WizardService} from './wizard.service';
import {WizardStepComponent} from './wizard-step.component';
import {CommonModule} from "@angular/common";

/**
 * Provides edge case functionality.
 *
 * This "remote control" can be used in situations where the wizard state cannot be managed by the wizard itself. For
 * example this is the case when the state of the wrapped content is restored after a page reload and the wizard
 * must not be rendered as usual (e.g. the first step is selected by default).
 *
 * Another use case may be relevant if the completion of a wrapped process must reset the wrapper (in other words: the
 * first step should be selected after the wrapped process completed).
 * This last use case could be handled internally if the validity of all steps would be provided as a reactive
 * API that could then be consumed by the {@link WizardService} (like "reset state" -> "steps stop being selectable" ->
 * "service moves to first selectable automagically"). But "go to first step" seems to be still semantically different
 * due to optional steps that are considered valid by default.
 */
export interface WizardRemoteControl {

  moveToFirstStep(): void;
  moveToLastSelectableStep(): void;

}

@Component({
  standalone: true,
  imports: [CommonModule, WizardStepComponent],
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [
    WizardService,
  ]
})
export class WizardComponent {

  /**
   * Provides imperative control over the wizard state as described in {@link WizardRemoteControl}.
   *
   * It must not expose internal implementation details or access to the underlying data structures in order to prevent
   * misuse or accidental corruption.
   */
  get remoteControl(): WizardRemoteControl {
    const service = this.wizardService;
    return {
      moveToFirstStep(): void {
        service.selectFirst();
      },

      moveToLastSelectableStep(): void {
        service.selectLastSelectable();
      },
    };
  }

  constructor(protected wizardService: WizardService) { }

}
