import {TestBed} from '@angular/core/testing';

import {WizardService} from './wizard.service';

describe('WizardService', () => {
  let service: WizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new WizardService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
