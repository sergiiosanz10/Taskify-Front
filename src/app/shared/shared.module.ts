import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SharedModule { }
