import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { TaskResponse } from '../../../dashboard/interfaces/task.interface';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  private fb = inject(FormBuilder);
  private DashboardService = inject(DashboardService);


  @Output()
  public datoActualizado = new EventEmitter<TaskResponse[]>()

  public groupedTasks = signal<Map<string, TaskResponse[]> | undefined>(undefined);
  public tasksList = signal<TaskResponse[]>([]);
  public uniqueColors = signal<string[]>([]);
  public uniqueLabels = signal<string[]>([]);
  public filterParam = signal<string>('');
  public type = signal<string>('');
  public listDate = signal<string[]>([]);

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


  newTask() {
    const taskData = this.myForm.value;

    this.DashboardService.newTask(taskData)
      .subscribe(task => {
        this.tasksList().push(task);
        this.sortTasks();
        this.groupTasksByDate();
        this.uniqueColors.set([...new Set(this.tasksList().map(task => task.color))]);
        this.uniqueLabels.set([...new Set(this.tasksList().map(task => task.label))]);
        this.datoActualizado.emit(this.tasksList());
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

  sortTasks() {
    this.tasksList().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  groupTasksByDate() {
    //Limpio el Map
    this.groupedTasks.set(new Map());

    //Limpio la lista de fechas
    this.listDate.set([])

    this.tasksList().forEach(task => {
      const date = task.date || '';
      if (!this.groupedTasks()?.has(date)) {
        var list = this.getTaskListInTheDay(date)
        this.listDate().push(date)
        this.groupedTasks()?.set(date, list);
      }
    })
  }

  getTaskListInTheDay(date: string) {

    var list = this.tasksList().filter(task => {

      if ((this.type() == "all" || this.type() == "" || this.type() == undefined) && task.date === date) {
        return true;
      } else if (this.type() == "pending" && task.date === date && task.status === false) {
        return true;
      } else if (this.type() == "complete" && task.date == date && task.status === true) {
        return true;
      }
      return false;
    });

    if (this.filterParam() != "") {
      list = list.filter(task => task.label === this.filterParam())
    }
    return list
  }

  isValidField(field: string) {
    return this.DashboardService.isValidField(this.myForm, field)
  }
}
