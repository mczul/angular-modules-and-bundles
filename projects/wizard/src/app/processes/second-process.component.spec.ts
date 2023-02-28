import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondProcessComponent } from './second-process.component';

describe('SecondProcessComponent', () => {
  let component: SecondProcessComponent;
  let fixture: ComponentFixture<SecondProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SecondProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
