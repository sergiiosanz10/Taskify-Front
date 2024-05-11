import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendarOptions?: CalendarOptions;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (!token) return;
    this.dashboardService.getTasks(token).subscribe(tasks => {
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: false,
        events: tasks.map(task => ({ title: task.name, start: task.date }))
      };
    });
  }
}
