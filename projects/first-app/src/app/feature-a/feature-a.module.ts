import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LegacyFirstComponent} from './legacy-first/legacy-first.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: LegacyFirstComponent}
];

@NgModule({
  declarations: [
    LegacyFirstComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FeatureAModule {
}
