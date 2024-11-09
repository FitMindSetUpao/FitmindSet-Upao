import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ForoService } from '../../Core/Services/foro.service'; // Importa el servicio
import { ForoDTO } from '../../Shared/Components/Models/foro.model'; // Importa el modelo del foro

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {
  foros: ForoDTO[] = []; // Define el tipo del arreglo como ForoDTO

  constructor(private foroService: ForoService) {}

  ngOnInit(): void {
    this.getForos();
  }

  getForos(): void {
    this.foroService.getForos().subscribe(
      (data: ForoDTO[]) => {
        this.foros = data;
      },
      (error) => {
        console.error('Error al obtener los foros:', error);
      }
    );
  }
}
