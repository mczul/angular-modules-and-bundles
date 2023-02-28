import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdProcessComponent } from './third-process.component';

describe('ThirdProcessComponent', () => {
  let component: ThirdProcessComponent;
  let fixture: ComponentFixture<ThirdProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ThirdProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
