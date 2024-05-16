import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { TareasAsignadasComponent } from './components/tasks-list/tareas-asignadas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GestionComponent } from './components/gestion/gestion.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../shared/components/modal/modal.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TareasAsignadasComponent,
    CalendarioComponent,
    GestionComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,

  ]
})
export class DashboardModule { }
