import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StandaloneSecondComponent} from "../standalone-second/standalone-second.component";

@Component({
  selector: 'app-standalone-first',
  standalone: true,
  imports: [CommonModule, StandaloneSecondComponent],
  templateUrl: './standalone-first.component.html',
  styles: []
})
export class StandaloneFirstComponent {

}
