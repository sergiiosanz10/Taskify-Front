import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { TaskResponse } from './task.interface';
import { User } from '../interfaces';
import { DtoResponseGetUser } from '../interfaces/DtoResponseGetUser';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;


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
    return this.http.delete<void>(`${this.baseUrl}/dashboard/tareas-asignadas/${id}`);
  }

  modifyTask(token: string, taskData:TaskResponse): Observable<TaskResponse> {
    const userId = sessionStorage.getItem('userId');
    const {label, name, description, time_start, time_end, date, status, color, taskId} = taskData;
    const body = {userId, label, name, description, time_start, time_end, date, status, color };

    return this.http.patch<TaskResponse>(`${this.baseUrl}/dashboard/tareas-asignadas/${taskId}`, body).pipe(
      catchError(err => {
        console.error('There was an error!', err);
        return throwError(() => err.error.message);
      })
    );
  }

  getTasks(token: string): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(`${this.baseUrl}/dashboard/load-tasks`);
  }

  getUsers(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth`);
  }

  getUserByToken(token: string): Observable<DtoResponseGetUser> {
    return this.http.get<DtoResponseGetUser>(`${this.baseUrl}/auth/check-token`);
  }

  deleteUser(id: string, token: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/dashboard/gestion/${id}`);
  }

  isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched
  }
}
