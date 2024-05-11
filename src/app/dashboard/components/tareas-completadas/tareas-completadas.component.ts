import { Component, OnInit } from '@angular/core';
import { TareasAsignadasComponent } from '../tareas-asignadas/tareas-asignadas.component';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.component.html',
  styleUrl: './tareas-completadas.component.css'
})
export class TareasCompletadasComponent extends TareasAsignadasComponent implements OnInit{

  override ngOnInit() {
    super.ngOnInit();
  }

  get completedTasks() {
    return this.tasksList.filter(task => task.status);
  }
}
