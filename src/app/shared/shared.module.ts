import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    SideNavComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    AlertComponent
  ]
})
export class SharedModule { }
