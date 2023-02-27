import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {PreloadAllModules, provideRouter, Routes, withDebugTracing, withPreloading} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";

const routes: Routes = [
  {
    path: 'feature/a',
    loadChildren: () => import('./app/feature-a/feature-a.module')
      .then(module => module.FeatureAModule)
  },
  {
    path: 'feature/b',
    loadChildren: () => import('./app/feature-b/feature-b.module')
      .then(module => module.FeatureBModule)
  },
  {
    path: 'standalone/1',
    loadComponent: () => import('./app/standalone-first/standalone-first.component')
      .then(component => component.StandaloneFirstComponent)
  },
  {
    path: 'standalone/2',
    loadComponent: () => import('./app/standalone-second/standalone-second.component')
      .then(component => component.StandaloneSecondComponent)
  },
  {
    path: 'standalone/3',
    loadComponent: () => import('./app/standalone-third/standalone-third.component')
      .then(component => component.StandaloneThirdComponent)
  },
  {path: '**', redirectTo: 'feature/a'},
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    provideHttpClient()
  ]
});
