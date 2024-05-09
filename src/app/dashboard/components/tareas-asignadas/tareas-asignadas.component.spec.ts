import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAsignadasComponent } from './tareas-asignadas.component';

describe('TareasAsignadasComponent', () => {
  let component: TareasAsignadasComponent;
  let fixture: ComponentFixture<TareasAsignadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareasAsignadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasAsignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
