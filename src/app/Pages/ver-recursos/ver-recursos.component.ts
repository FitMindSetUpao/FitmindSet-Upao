import { Component, OnInit } from '@angular/core';
import { RecursoService } from '../../Core/Services/recurso.service';
import { Recurso } from '../../Shared/Components/Models/recurso.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-recursos',
  standalone: true,
  templateUrl: './ver-recursos.component.html',
  styleUrls: ['./ver-recursos.component.scss'],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class VerRecursosComponent implements OnInit {
  recursos: Recurso[] = [];

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.recursoService.getRecursos().subscribe((data) => {
      this.recursos = data;
    });
  }
}
