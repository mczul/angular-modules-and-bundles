import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter, Routes} from '@angular/router';
import {FirstProcessComponent} from './app/processes/first-process.component';
import {SecondProcessComponent} from './app/processes/second-process.component';
import {ThirdProcessComponent} from './app/processes/third-process.component';

const routes: Routes = [
  {path: 'first', component: FirstProcessComponent},
  {path: 'second', component: SecondProcessComponent},
  {path: 'third', component: ThirdProcessComponent},
  {path: '**', redirectTo: '/first'},
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ],
});
