import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  template: `
    <h1>Wizard App</h1>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'wizard';
}
