import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskResponse } from '../../services/task.interface';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  private fb = inject(FormBuilder);
  private dashboardService = inject(DashboardService);

  @Input()
  public uniqueLabels = signal<string[]>([]);

  @Output()
  public datoActualizado = new EventEmitter<TaskResponse[]>()

  public tasksList = signal<TaskResponse[]>([]);


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

    this.dashboardService.newTask(taskData)
      .subscribe(task => {
        this.tasksList().push(task);
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

  isValidField(field: string) {
    return this.dashboardService.isValidField(this.myForm, field)
  }

}
