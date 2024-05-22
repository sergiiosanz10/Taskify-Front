import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TareasAsignadasComponent } from './components/tasks-list/tareas-asignadas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GestionComponent } from './components/gestion/gestion.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: 'gestion',
        component: GestionComponent
      },
      {
        path: ':type',
        component: TareasAsignadasComponent
      },
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
