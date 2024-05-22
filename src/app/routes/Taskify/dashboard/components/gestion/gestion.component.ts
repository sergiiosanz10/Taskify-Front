import { Component, Signal, computed, inject, signal } from '@angular/core';
import { User } from '../../../../../shared/interfaces';
import { DashboardService } from '../../../../../shared/services/dashboard.service';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {

  private dashboardService = inject(DashboardService);

  public usersList = signal<User[]>([]);
  public isLoading = signal<boolean>(false);
  public users: Signal<User[]> = computed<User[]>( () => this.usersList())


  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.isLoading.set(true);
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getUsers(token)
      .subscribe( users => {
        this.usersList.set(users);
        this.isLoading.set(false);
      });
  }

  deleteUser(id: string) {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.deleteUser(id, token)
      .subscribe(() => {
        this.usersList.set(this.usersList().filter(user => user._id !== id));
      });
  }
}
