import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinerComponent } from './components/loading-spiner/loading-spiner.component';



@NgModule({
  declarations: [
    SideNavComponent,
    AlertComponent,
    LoadingSpinerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    AlertComponent,
    LoadingSpinerComponent
  ]
})
export class SharedModule { }
