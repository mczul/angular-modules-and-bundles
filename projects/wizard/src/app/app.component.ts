import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  template: `
    <div id="site">
      <header>
        <h1>Wizard App</h1>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer></footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'wizard';
}
