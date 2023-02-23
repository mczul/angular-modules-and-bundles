import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone-second',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standalone-second.component.html',
  styleUrls: ['./standalone-second.component.scss']
})
export class StandaloneSecondComponent {

}
