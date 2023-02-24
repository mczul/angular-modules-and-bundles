import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LegacyFirstComponent} from './legacy-first/legacy-first.component';
import {RouterModule, Routes} from "@angular/router";
import {LegacySecondComponent} from "./legacy-second/legacy-second.component";

const routes: Routes = [
  {path: 'first', component: LegacyFirstComponent},
  {path: 'second', component: LegacySecondComponent},
  {path: '**', redirectTo: 'first'},
];

@NgModule({
  declarations: [
    LegacyFirstComponent,
    LegacySecondComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FeatureAModule {
}
