import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TaskResponse } from '../interfaces/task.interface';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;


  constructor() { }


  newTask(taskData: TaskResponse ): Observable<TaskResponse> {
    const userId = sessionStorage.getItem('userId');
    const url = `${this.baseUrl}/dashboard/tareas-asignadas`;
    const {label, name, description, time_start, time_end, date, status, color} = taskData;
    const body = { userId, label, name, description, time_start, time_end, date, status, color };

    return this.http.post<TaskResponse>(url, body).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
      })
    );
  }

  deleteTask(id: string, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/dashboard/tareas-asignadas/${id}`, { headers });
  }

  modifyTask(token: string, taskData:TaskResponse): Observable<TaskResponse> {
    const userId = sessionStorage.getItem('userId');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const {label, name, description, time_start, time_end, date, status, color, taskId} = taskData;
    const body = {userId, label, name, description, time_start, time_end, date, status, color };

    return this.http.patch<TaskResponse>(`${this.baseUrl}/dashboard/tareas-asignadas/${taskId}`, body, { headers }).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
      })
    );
  }

  getTasks(token: string): Observable<TaskResponse[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TaskResponse[]>(`${this.baseUrl}/dashboard/load-tasks`, { headers });
  }


  isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched
  }

}
