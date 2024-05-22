import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input()
  public message: string = '';

  @Input()
  public alertType: string = 'alert-danger'
}
