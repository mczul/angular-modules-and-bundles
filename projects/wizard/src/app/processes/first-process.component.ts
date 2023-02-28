import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from "../wizard/wizard.component";
import {StepComponent} from "../wizard/step.component";
import {FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrationSummaryComponent} from "./common/registration-summary.component";

@Component({
  selector: 'app-first-process',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WizardComponent, StepComponent, RegistrationSummaryComponent],
  templateUrl: './first-process.component.html',
  styles: []
})
export class FirstProcessComponent {
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

}
