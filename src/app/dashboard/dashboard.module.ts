import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '../shared/shared.module';
import { TareasAsignadasComponent } from './components/tareas-asignadas/tareas-asignadas.component';
import { TareasPendientesComponent } from './components/tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './components/tareas-completadas/tareas-completadas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GestionComponent } from './components/gestion/gestion.component'; 


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TareasAsignadasComponent,
    TareasPendientesComponent,
    TareasCompletadasComponent,
    CalendarioComponent,
    GestionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule
  ]
})
export class DashboardModule { }
