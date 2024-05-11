import { Component, OnInit } from '@angular/core';
import { TareasAsignadasComponent } from '../tareas-asignadas/tareas-asignadas.component';

@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-pendientes.component.html',
  styleUrl: './tareas-pendientes.component.css'
})
export class TareasPendientesComponent extends  TareasAsignadasComponent implements OnInit {

  override ngOnInit() {
    super.ngOnInit();
  }

  get pendingTasks() {
    return this.tasksList.filter(task => !task.status);
  }
}
