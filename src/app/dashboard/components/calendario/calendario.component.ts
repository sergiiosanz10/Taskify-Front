import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'; // Import Spanish locale
import { TaskResponse } from '../../interfaces/task.interface';
import { TareasAsignadasComponent } from '../tasks-list/tareas-asignadas.component';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent  implements OnInit {
  @ViewChild('eventTemplate') eventTemplate?: TemplateRef<any>;

  public calendarOptions?: CalendarOptions;
  public tasksList: TaskResponse[] = []

  constructor(private dashboardService: DashboardService) {
  }

   ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getTasks(token)
      .subscribe(tasks => {
        this.tasksList = tasks;
        this.onTasksChanged(this.tasksList);
      });

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      weekends: true,
      locale: esLocale,
      events: [],
      editable: true,
      eventDrop: this.handleEventDrop.bind(this),
      displayEventEnd: true,
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      },
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: 'short'
      },
      eventContent: function (arg) {
        let iconClass = arg.event.extendedProps['status'] ? 'fa-check' : 'fa-clock';
        let html = `
    <div class="task col-12 d-flex flex-column" style="padding: 10px; background-color: ${arg.event.backgroundColor}; color: white; border-radius: 5px; overflow: hidden; text-overflow: ellipsis;">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <small>${arg.event.extendedProps['time_start']} - ${arg.event.extendedProps['time_end']}</small>
        </div>
        <div>
          <i class="fa-solid ${iconClass} mx-1"></i>
        </div>
      </div>
      <strong class="mt-2" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${arg.event.title}</strong>
      <p class="mb-0" style="color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${arg.event.extendedProps['description']}</p>
    </div>
  `;
        return { html };
      }
    };
  }

  onTasksChanged(tareas: TaskResponse[]) {
    const events: EventInput[] = tareas.map(tarea => {
      let startDate, endDate;

      if (tarea.time_start && tarea.time_end) {
        startDate = new Date(tarea.date);
        endDate = new Date(tarea.date);
        let [startHour, startMinute] = tarea.time_start.split(':').map(Number);
        let [endHour, endMinute] = tarea.time_end.split(':').map(Number);

        startDate.setHours(startHour, startMinute);
        endDate.setHours(endHour, endMinute);
      } else {
        startDate = new Date(tarea.date.split('T')[0]);
        endDate = new Date(tarea.date.split('T')[0]);
      }

      return {
        id: tarea.taskId,
        title: tarea.name,
        start: startDate,
        end: endDate,
        allDay: !tarea.time_start || !tarea.time_end,
        backgroundColor: tarea.color ? tarea.color : 'gray',
        extendedProps: {
          description: tarea.description,
          status: tarea.status,
          time_start: tarea.time_start,
          time_end: tarea.time_end
        },
      };
    });

    if (!this.calendarOptions) return;
    this.calendarOptions.events = events;
  }

  handleEventDrop(eventDropInfo: any) {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const task = this.tasksList.find(task => task.taskId === eventDropInfo.event.id);
    if (!task) return;

    const date = new Date(Date.UTC(
      eventDropInfo.event.start.getFullYear(),
      eventDropInfo.event.start.getMonth(),
      eventDropInfo.event.start.getDate()
    ));

    task.date = date.toISOString().split('T')[0];

    task.time_start = new Date(eventDropInfo.event.start).toISOString().split('T')[1].substring(0, 5);
    task.time_end = new Date(eventDropInfo.event.end).toISOString().split('T')[1].substring(0, 5);


    this.dashboardService.modifyTask(token, task)
      .subscribe(updatedTask => {
        const index = this.tasksList.findIndex(t => t.taskId === updatedTask.taskId);
        if (index !== -1) {
          this.tasksList[index] = updatedTask;
        }
      });
  }




}
