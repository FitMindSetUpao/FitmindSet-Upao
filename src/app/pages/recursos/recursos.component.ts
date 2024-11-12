import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../shared/models/recurso.model';
import { RecursoService } from '../../core/services/recurso.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  standalone: true,
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {
  recursos: Recurso[] = [];

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.loadRecursos();
  }

  loadRecursos(): void {
    this.recursoService.getRecursos().subscribe(
      (data) => this.recursos = data,
      (error) => console.error('Error al cargar los recursos', error)
    );
  }

  viewMetrics(recurso: Recurso): void {
    console.log('Ver métricas del recurso:', recurso);
  }

  viewStatistics(recurso: Recurso): void {
    console.log('Ver estadísticas del recurso:', recurso);
  }

  editRecurso(recurso: Recurso): void {
    console.log('Editar recurso:', recurso);
  }


}
