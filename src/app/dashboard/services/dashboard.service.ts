import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TaskResponse } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;


  constructor() { }


  newTask(label: string, name: string, description: string, time_start: string, time_end: string, date: string, color: string, status: boolean): Observable<TaskResponse> {

    const url = `${this.baseUrl}/dashboard/tareas-asignadas`;
    const body =  {label, name, description, time_start, time_end, date, status, color};
    console.log(body);

    return this.http.post<TaskResponse>(url, body)
  }
}
