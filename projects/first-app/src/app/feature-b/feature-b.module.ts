import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LegacyThirdComponent} from './legacy-third/legacy-third.component';
import {LegacyFourthComponent} from './legacy-fourth/legacy-fourth.component';
import {RouterModule, Routes} from "@angular/router";
import {StandaloneFirstComponent} from "../standalone-first/standalone-first.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LegacyThirdComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  declarations: [
    LegacyThirdComponent,
    LegacyFourthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StandaloneFirstComponent,
  ],
})
export class FeatureBModule {
}
