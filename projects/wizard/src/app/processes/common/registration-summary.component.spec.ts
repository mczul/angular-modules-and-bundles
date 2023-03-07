import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationSummaryComponent} from './registration-summary.component';

describe('RegistrationSummaryComponent', () => {
  let component: RegistrationSummaryComponent;
  let fixture: ComponentFixture<RegistrationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSummaryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegistrationSummaryComponent);
    component = fixture.componentInstance;
    component.summary = {
      base: {username: 'max.mustermann@gmx.de', firstName: 'Max', lastName: 'Mustermann',},
      contact: {emails: [], phoneNumbers: [],},
      legal: {privacy: true}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
