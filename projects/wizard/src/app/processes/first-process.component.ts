import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from "../wizard/wizard.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrationSummaryComponent} from "./common/registration-summary.component";
import {WizardStepComponent} from "../wizard/wizard-step.component";

@Component({
  selector: 'app-first-process',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WizardComponent, WizardStepComponent, RegistrationSummaryComponent],
  templateUrl: './first-process.component.html',
  styles: []
})
export class FirstProcessComponent {
  @ViewChild(WizardComponent)
  protected wizardComponent!: WizardComponent;

  protected state = new FormGroup({
    base: new FormGroup({
      username: new FormControl<string>('', {validators: [Validators.required, Validators.email], nonNullable: true}),
      // ---
      firstName: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
      // ---
      lastName: new FormControl<string>('', {validators: [Validators.required], nonNullable: true}),
    }),
    contact: new FormGroup({
      emails: new FormArray<FormControl<string>>(
        [this.buildEmailControl()],
        {}
      ),
      // ---
      phoneNumbers: new FormArray<FormControl<string>>(
        [this.buildPhoneNumberControl()],
        {validators: [Validators.required]}
      ),
    }),
    legal: new FormGroup({
      privacy: new FormControl<boolean | null>(null, {validators: [Validators.required, Validators.requiredTrue]}),
    }),
  });

  /**
   * Used to keep DRY
   */
  protected buildEmailControl(): FormControl<string> {
    return new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    });
  }

  /**
   * Used to keep DRY
   */
  protected buildPhoneNumberControl(): FormControl<string> {
    return new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    });
  }

  /**
   * Optional; used to shorten template refs
   */
  protected get base() {
    return this.state.controls.base;
  }

  /**
   * Optional; used to shorten template refs
   */
  protected get contact() {
    return this.state.controls.contact;
  }

  /**
   * Optional; used to shorten template refs
   */
  protected get contactEmails() {
    return this.contact.controls.emails;
  }

  /**
   * Used to append an email input
   */
  protected appendEmailInput(): void {
    this.contactEmails.push(
      this.buildEmailControl()
    );
  }

  /**
   * Optional; used to shorten template refs
   */
  protected get contactPhoneNumbers() {
    return this.contact.controls.phoneNumbers;
  }

  /**
   * Used to append a phone number input
   */
  protected appendPhoneNumberInput(): void {
    this.contactPhoneNumbers.push(
      this.buildPhoneNumberControl()
    );
  }

  /**
   * Optional; used to shorten template refs
   */
  protected get legal() {
    return this.state.controls.legal;
  }

  /**
   * Simulates the registration of a new account
   */
  protected register(): void {
    alert(JSON.stringify(this.state.getRawValue(), null, 2));
    setTimeout(() => {
      this.state.reset();
      this.wizardComponent.remoteControl.moveToFirstStep();
    }, 1_000);
  }

}
