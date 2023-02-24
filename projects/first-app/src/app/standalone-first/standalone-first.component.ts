import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-standalone-first',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone-first.component.html',
  styleUrls: ['./standalone-first.component.scss']
})
export class StandaloneFirstComponent {

}
