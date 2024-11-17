import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
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
  styleUrls: ['./recurso-list.component.scss'],
})
export class RecursoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'tipo', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  totalRecursos = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private router = inject(Router);

  ngOnInit(): void {
    this.cargarRecursos(); // Carga inicial de datos ficticios
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Vincular el paginador
  }

  cargarRecursos(): void {
    const mockData = [
      {
        recursoid: 1,
        nombreRecurso: 'Recurso de Prueba 1',
        descripcionRecurso: 'Descripción del recurso 1',
        tipoRecurso: 'Documento',
      },
      {
        recursoid: 2,
        nombreRecurso: 'Recurso de Prueba 2',
        descripcionRecurso: 'Descripción del recurso 2',
        tipoRecurso: 'Video',
      },
      {
        recursoid: 3,
        nombreRecurso: 'Recurso de Prueba 3',
        descripcionRecurso: 'Descripción del recurso 3',
        tipoRecurso: 'Audio',
      },
    ];

    this.dataSource.data = mockData;
    this.totalRecursos = mockData.length;
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearRecurso(): void {
    this.router.navigate(['/recursos/new']);
  }

  actualizarRecurso(recurso: any): void {
    this.router.navigate([`/recursos/edit/${recurso.recursoid}`]);
  }

  eliminarRecurso(recurso: any): void {
    console.log(`Recurso con ID ${recurso.recursoid} eliminado.`);
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
