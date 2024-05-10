import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { TareasAsignadasComponent } from './components/tareas-asignadas/tareas-asignadas.component';
import { TareasPendientesComponent } from './components/tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './components/tareas-completadas/tareas-completadas.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'tareas-asignadas',
        component: TareasAsignadasComponent
      },
      {
        path: 'tareas-pendientes',
        component: TareasPendientesComponent
      },
      {
        path: 'tareas-completadas',
        component: TareasCompletadasComponent
      },
      {
        path: 'calendario',
        component: CalendarioComponent
      },
      {
        path: '**',
        redirectTo: 'tareas-asignadas',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
