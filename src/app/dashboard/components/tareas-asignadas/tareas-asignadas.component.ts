import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { TaskResponse } from '../../interfaces/task.interface';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrl: './tareas-asignadas.component.css'
})
export class TareasAsignadasComponent implements OnInit {

  private activeRoute = inject(Router)
  private fb = inject(FormBuilder);
  private DashboardService = inject(DashboardService);

  public groupedTasks: Map<string,TaskResponse[]> | undefined
  public taskDates: string[] = [];
  public tasksList: TaskResponse[] = [];
  public uniqueColors: string[] = [];
  public uniqueLabels: string[] = [];
  public filterParam  : string = "";
  public type : string = ""
  public listDate: string[] = []
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

  constructor(){
    this.activeRoute.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event : any) => {
      let params : string= event["url"].split("/")
      this.type = params[2]
      if(this.type=="all" || this.type=="pending" || this.type=="complete"){
        this.filterParam = ""
        this.loadTasks()
      }
      this.tasksList = []
      this.listDate = []
    })


  }

  ngOnInit() {

    if(this.type==""){
      this.loadTasks()
    }
  }


  loadTasks() {
    const token = sessionStorage.getItem('token');
    if (!token) return;
    this.groupedTasks = new Map();
    this.DashboardService.getTasks(token)
      .subscribe(tasks => {
        this.tasksList = tasks;
        this.groupTasksByDate();
        this.sortTasks();
        this.uniqueColors = [...new Set(this.tasksList.map(task => task.color))];
        this.uniqueLabels = [...new Set(this.tasksList.map(task => task.label))];

      });
  }

   groupTasksByDate() {
    this.groupedTasks = new Map();
    this.listDate=[]
    console.log(this.type);
    this.tasksList.forEach(task => {
      const date = task.date ||'';
      if (!this.groupedTasks?.has(date)) {
        this.listDate.push(date)
        var list = this.getTaskListInTheDay(date)
        this.groupedTasks?.set(date, list);

      }


    })

    console.log(this.groupedTasks, "Grouped tasks");
    // for (const task of this.tasksList) {
    //   const date = task.date || '';
    //   if (!this.groupedTasks[date]) {
    //     this.groupedTasks[date] = [];
    //   }

    //   if(this.type()=="" || this.type()=="all"){

    //     this.groupedTasks[date].push(task);

    //   }

    //   if(this.type()=="pending" && task.status === false){

    //     this.groupedTasks[date].push(task);
    //   }

    //   if(this.type()=="complete" && task.status === true){

    //     this.groupedTasks[date].push(task);
    //   }

    // }
    // console.log(this.groupedTasks);
    // this.taskDates = Object.keys(this.groupedTasks);
  }
  getTaskListInTheDay(date : string){

    var list = this.tasksList.filter(task => {

      if ((this.type == "all" || this.type == "" || this.type == undefined )&& task.date === date) {
          return true;
      } else if (this.type == "pending" && task.date === date && task.status === false) {
          return true;
      } else if (this.type == "complete" && task.date == date && task.status === true) {
          return true;
      }
      return false;
  });
    if(this.filterParam != ""){
      list = list.filter(task => task.label === this.filterParam)

    }
    return list
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
    this.filterParam = label
    this.groupedTasks= new Map()
    console.log(this.groupedTasks);
    this.loadTasks()
  }

}
