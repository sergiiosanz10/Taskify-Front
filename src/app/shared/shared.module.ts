import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { LoadgingSpinerComponent } from './components/loadging-spiner/loadging-spiner.component';



@NgModule({
  declarations: [
    SideNavComponent,
    AlertComponent,
    LoadgingSpinerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    AlertComponent,
    LoadgingSpinerComponent
  ]
})
export class SharedModule { }
