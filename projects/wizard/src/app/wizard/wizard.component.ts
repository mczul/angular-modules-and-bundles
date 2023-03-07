import { Component } from '@angular/core';
import { WizardService } from './wizard.service';
import {WizardStepComponent} from './wizard-step.component';
import {CommonModule} from "@angular/common";

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

  constructor(protected wizardService: WizardService) { }

}
