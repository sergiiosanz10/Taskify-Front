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


  newTask(label: string, name: string, description: string, time_start: string, time_end: string, date: string, color: string): Observable<TaskResponse> {

    const userId = sessionStorage.getItem('userId'); // Recupera la ID del usuario del localStorage


    const url = `${this.baseUrl}/dashboard/tareas-asignadas`;
    const body = { label, name, description, time_start, time_end, date, status: false, color, userId: userId }

    return this.http.post<TaskResponse>(url, body).pipe(
      map(response => {
        // Transforma la respuesta aquí si es necesario
        return response;
      }),
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

  getTasks(token: string): Observable<TaskResponse[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TaskResponse[]>(`${this.baseUrl}/dashboard/load-tasks`, { headers });
  }


  isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched
  }

}
