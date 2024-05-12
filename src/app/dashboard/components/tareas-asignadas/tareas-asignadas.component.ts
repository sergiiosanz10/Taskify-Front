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
    label: [''],
    name: ['', [Validators.required]],
    description: [''],
    time_start: [''],
    time_end: [''],
    date: [''],
    color: [''],
    status: [false],
  })


  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.DashboardService.getTasks(token)
      .subscribe(tasks => {
        this.tasksList = tasks;
        this.sortTasks();
      });
  }

newTask() {
  const taskData = this.myForm.value;

  this.DashboardService.newTask(taskData)
    .subscribe(task => {
      this.tasksList.push(task);
      this.sortTasks();
      console.log(task);
    });

  this.myForm.reset({
    label: '',
    name: '',
    description: '',
    time_start: '',
    time_end: '',
    date: '',
    color: '',
    status: false,
  });
}

  deleteTask(id: string) {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.DashboardService.deleteTask(id, token)
      .subscribe(() => {
        this.tasksList = this.tasksList.filter(task => task.taskId !== id);
      });
  }

  modifyTask(task: TaskResponse) {
    const token = sessionStorage.getItem('token');

    if (!token) return;

    this.DashboardService.modifyTask(token, task)
      .subscribe(updatedTask => {
        const index = this.tasksList.findIndex(t => t.taskId === updatedTask.taskId);
        if (index !== -1) {
          this.tasksList[index] = updatedTask;
        }
      });
  }

  isValidField(field: string) {
    return this.DashboardService.isValidField(this.myForm, field)
  }


  sortTasks() {
    this.tasksList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
