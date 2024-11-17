import {Component, OnInit, ViewChild, AfterViewInit, inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RecursoService } from '../../../Core/Services/recurso.service';
import { RecursoResponse } from '../../../Shared/Components/Models/recurso-response.model';
import { MediaService } from '../../../Core/Services/media.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recurso-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './recurso-list.component.html',
  styleUrls: ['./recurso-list.component.scss']
})
export class RecursoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource<RecursoResponse>();
  totalRecursos = 0;
  private router = inject(Router);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private recursoService: RecursoService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.cargarRecursos(0, 5); // Carga inicial con la primera página y 5 elementos por página
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarRecursos(pageIndex: number, pageSize: number): void {
    // Datos ficticios para pruebas
    const mockData: RecursoResponse[] = [
      {
        recursoid: 1,
        nombreRecurso: "Recurso de Prueba 1",
        descripcionRecurso: "Descripción del recurso 1",
        precioRecurso: 100,
        tipoRecurso: "Documento",
        autorNombre: "Autor 1",
        coverPath: "https://via.placeholder.com/150",
        filePath: "file1.pdf",
        createdAt: "2023-11-01T10:00:00",
        updatedAt: "2023-11-05T15:00:00",
        tipoDeHabito: "Hábitos de estudio"
      },
      {
        recursoid: 2,
        nombreRecurso: "Recurso de Prueba 2",
        descripcionRecurso: "Descripción del recurso 2",
        precioRecurso: 200,
        tipoRecurso: "Video",
        autorNombre: "Autor 2",
        coverPath: "https://via.placeholder.com/150",
        filePath: "file2.mp4",
        createdAt: "2023-11-02T11:00:00",
        updatedAt: "2023-11-06T16:00:00",
        tipoDeHabito: "Hábitos de ejercicio"
      },
      {
        recursoid: 3,
        nombreRecurso: "Recurso de Prueba 3",
        descripcionRecurso: "Descripción del recurso 3",
        precioRecurso: 300,
        tipoRecurso: "Audio",
        autorNombre: "Autor 3",
        coverPath: "https://via.placeholder.com/150",
        filePath: "file3.mp3",
        createdAt: "2023-11-03T12:00:00",
        updatedAt: "2023-11-07T17:00:00",
        tipoDeHabito: "Hábitos de relajación"
      }
    ];

    // Simula la estructura de una respuesta paginada
    const mockPageResponse = {
      content: mockData,
      totalElements: mockData.length
    };

    // Asigna los datos simulados a la tabla
    this.dataSource.data = mockPageResponse.content;
    this.totalRecursos = mockPageResponse.totalElements;
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearRecurso(): void {
    console.log('Crear nuevo recurso');
    this.router.navigate(['/recursos/new']);
  }

  actualizarRecurso(recurso: RecursoResponse): void {
    console.log('Actualizar recurso:', recurso);
    // Aquí podrías redirigir a una página de actualización de recursos o abrir un diálogo de actualización
  }

  eliminarRecurso(recurso: RecursoResponse): void {
    console.log('Eliminar recurso con ID:', recurso.recursoid);
    // Implementa aquí la lógica para eliminar el recurso
  }
}


//cargarRecursos(pageIndex: number, pageSize: number): void {
//   this.recursoService.getRecursos(pageIndex, pageSize).subscribe(data => {
//     this.dataSource.data = data.content;
//     this.totalRecursos = data.totalElements;
//   }, error => {
//     console.error('Error al cargar los recursos:', error);
//   });
// }
