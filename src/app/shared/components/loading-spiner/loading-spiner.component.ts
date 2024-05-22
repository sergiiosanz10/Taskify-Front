import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loading-spiner',
  templateUrl: './loading-spiner.component.html',
  styleUrl: './loading-spiner.component.scss'
})
export class LoadingSpinerComponent {
  @Input() color: string = '#454545';
}
