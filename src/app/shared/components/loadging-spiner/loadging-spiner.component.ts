import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loadging-spiner',
  templateUrl: './loadging-spiner.component.html',
  styleUrl: './loadging-spiner.component.scss'
})
export class LoadgingSpinerComponent {
  @Input() color: string = '#454545';
}
