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
  public groupedTasks: { [key: string]: TaskResponse[] } = {};
  public taskDates: string[] = [];
  public tasksList: TaskResponse[] = [];
  public uniqueColors: string[] = [];
  public uniqueLabels: string[] = [];
  public filteredTasks: TaskResponse[] = [];

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
        console.log(tasks);

        this.sortTasks();
        this.groupTasksByDate();
        this.uniqueColors = [...new Set(this.tasksList.map(task => task.color))];
        this.uniqueLabels = [...new Set(this.tasksList.map(task => task.label))];

      });
  }
  groupTasksByDate() {
    this.groupedTasks = {};

    for (const task of this.tasksList) {
      const date = task.date || 'Sin fecha';
      if (!this.groupedTasks[date]) {
        this.groupedTasks[date] = [];
      }
      this.groupedTasks[date].push(task);
    }

    this.taskDates = Object.keys(this.groupedTasks);
  }

  newTask() {
    const taskData = this.myForm.value;

    this.DashboardService.newTask(taskData)
      .subscribe(task => {
        this.tasksList.push(task);
        this.sortTasks();
        this.groupTasksByDate();
        this.uniqueColors = [...new Set(this.tasksList.map(task => task.color))];
        this.uniqueLabels = [...new Set(this.tasksList.map(task => task.label))];
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
        this.groupTasksByDate();
        this.sortTasks();
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
          this.groupTasksByDate();
          this.sortTasks();
          this.uniqueColors = [...new Set(this.tasksList.map(task => task.color))];
          this.uniqueLabels = [...new Set(this.tasksList.map(task => task.label))];
        }
      });
  }

  isValidField(field: string) {
    return this.DashboardService.isValidField(this.myForm, field)
  }


  sortTasks() {
    this.tasksList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  filterByLabel(label: string) {
    this.filteredTasks = this.tasksList.filter(task => task.label === label);
  }

}
