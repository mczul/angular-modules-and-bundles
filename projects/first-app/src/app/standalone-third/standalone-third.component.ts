import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeatureBModule} from "../feature-b/feature-b.module";

@Component({
  selector: 'app-standalone-third',
  standalone: true,
  imports: [CommonModule, FeatureBModule],
  templateUrl: './standalone-third.component.html',
  styles: []
})
export class StandaloneThirdComponent {

}
