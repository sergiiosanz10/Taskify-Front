import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { TaskResponse } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css'
})
export class TareasAsignadasComponent {

  private fb = inject(FormBuilder);
  private DashboardService = inject(DashboardService);

  public tasksList: TaskResponse | undefined;

  public myForm: FormGroup = this.fb.group({
    label:        [''],
    name:         [''],
    description:  [''],
    time_start:   [''],
    time_end:     [''],
    date:         [''],
    color:        [''],
    status:       [false],
  })



newTask(){
    const {label, name, description, time_start, time_end, date, color, status } = this.myForm.value;

    this.DashboardService.newTask(label, name, description, time_start, time_end, date, color, status)
      .subscribe( task => {this.tasksList = task, console.log(task)});
}

}
