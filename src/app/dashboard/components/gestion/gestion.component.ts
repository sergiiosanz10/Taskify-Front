import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {  User } from '../../../auth/interfaces';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {

  private dashboardService = inject(DashboardService);

  public usersList: User[] = []

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getUsers(token)
      .subscribe( users => {this.usersList = users, console.log(users);
      });
  }

  deleteUser(id: string) {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.deleteUser(id, token)
      .subscribe(() => {
        this.usersList = this.usersList.filter(user => user._id !== id);
      });
  }
}
