import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstProcessComponent } from './first-process.component';

describe('FirstProcessComponent', () => {
  let component: FirstProcessComponent;
  let fixture: ComponentFixture<FirstProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FirstProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
