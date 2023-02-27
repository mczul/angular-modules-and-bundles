import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Router} from "@angular/router";
import {StandaloneFirstComponent} from "./standalone-first/standalone-first.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([
          {path: '', component: StandaloneFirstComponent},
        ]),
      ],
    }).compileComponents();
  });

  it('must create the app', () => {
    // given
    // when
    const app = TestBed.createComponent(AppComponent).componentInstance;
    // then
    expect(app).toBeTruthy();
  });

  it('must render more than nothing', async () => {
    // given
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    // when
    await router.navigateByUrl('');
    fixture.detectChanges();

    // then
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')?.textContent?.length).toBeGreaterThan(1_000);
  });
});
