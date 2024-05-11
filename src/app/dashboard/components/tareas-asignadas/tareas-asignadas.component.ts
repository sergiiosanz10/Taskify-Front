import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { TaskResponse } from '../../interfaces/task.interface';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css'
})
export class TareasAsignadasComponent implements OnInit {

  private fb = inject(FormBuilder);
  private DashboardService = inject(DashboardService);

  public tasksList: TaskResponse[] = [];

  public myForm: FormGroup = this.fb.group({
    label:        [''],
    name:         ['', [Validators.required]],
    description:  [''],
    time_start:   [''],
    time_end:     [''],
    date:         [''],
    color:        [''],
    status:       [false],
  })

  ngOnInit() {
    this.loadTasks();

  }

  loadTasks() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.DashboardService.getTasks(token)
      .subscribe(tasks => this.tasksList = tasks);

  }

  newTask(){
    const {label, name, description, time_start, time_end, date, color } = this.myForm.value;

    this.DashboardService.newTask(label, name, description, time_start, time_end, date, color)
      .subscribe( task => {this.tasksList.push(task), console.log(task)});

    this.myForm.reset();
  }

  deleteTask(id: string){
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.DashboardService.deleteTask(id, token)
      .subscribe(() => {
        this.tasksList = this.tasksList.filter(task => task.taskId !== id);
      });
  }

  isValidField(field: string){
    return this.DashboardService.isValidField(this.myForm, field)
  }

}
