import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandaloneFirstComponent } from './standalone-first.component';

describe('StandaloneFirstComponent', () => {
  let component: StandaloneFirstComponent;
  let fixture: ComponentFixture<StandaloneFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StandaloneFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandaloneFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
