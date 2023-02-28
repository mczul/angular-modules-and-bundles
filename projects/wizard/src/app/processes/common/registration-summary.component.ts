import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RegistrationSummary {
  base: {
    username: string;
    firstName: string;
    lastName: string;
  },
  contact: {
    emails?: string[];
    phoneNumbers: string[];
  },
  legal: {
    privacy: boolean | null;
  }
}

@Component({
  selector: 'app-registration-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <dl>
      <dt>Benutzername</dt>
      <dd>{{ summary.base.username }}</dd>
      <dt>Name</dt>
      <dd>{{ summary.base.firstName }} {{ summary.base.lastName }}</dd>
      <dt>Kontakt</dt>
      <dd>E-Mails: {{ summary.contact.emails?.join(', ') ?? '-' }}</dd>
      <dd>Tel.-Nummern: {{ summary.contact.phoneNumbers.join(', ') }}</dd>
    </dl>
  `,
  styles: [
  ]
})
export class RegistrationSummaryComponent {
  @Input()
  summary!: RegistrationSummary;

}
