import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'feature/a',
    loadChildren: () => import('./feature-a/feature-a.module')
      .then(module => module.FeatureAModule)
  },
  {
    path: 'feature/b',
    loadChildren: () => import('./feature-b/feature-b.module')
      .then(module => module.FeatureBModule)
  },
  {
    path: 'standalone/1',
    loadComponent: () => import('./standalone-first/standalone-first.component')
      .then(component => component.StandaloneFirstComponent)
  },
  {
    path: 'standalone/2',
    loadComponent: () => import('./standalone-second/standalone-second.component')
      .then(component => component.StandaloneSecondComponent)
  },
  {
    path: 'standalone/3',
    loadComponent: () => import('./standalone-third/standalone-third.component')
      .then(component => component.StandaloneThirdComponent)
  },
  {path: '**', redirectTo: 'feature/a'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
