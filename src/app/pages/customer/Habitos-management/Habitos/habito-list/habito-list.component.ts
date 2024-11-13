import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitoResponse } from '../../../../../shared/models/habito-response.model';
import { HabitoService } from '../../../../../core/services/habito.services';
import { PageableResponse } from '../../../../../shared/models/pageable.response.model';
@Component({
  selector: 'app-habito-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './habito-list.component.html',
  styleUrl: './habito-list.component.scss'
})
export class HabitoListComponent implements OnInit {
  habitos: HabitoResponse[] = [];
  filteredHabitos: HabitoResponse[] = [];
  filterText= '';

  displayedColumns: String[] = [
    'nombre',
    'descripcion',
    'tipoDeHabito',
    'actions',
  ]
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  private HabitoService = inject(HabitoService);
  private snackbar = inject(MatSnackBar);
  private router = inject (Router);

  ngOnInit():void {
    this.loadHabitos();
  }
  loadHabitos(pageIndex: number = 0, pageSize: number = 5): void {
    this.HabitoService.paginateHabitos(pageIndex, pageSize).subscribe({
      next: (response: PageableResponse<HabitoResponse>) => {
        console.log(response);  // Verifica la respuesta en la consola
        this.habitos = response.content;
        this.filteredHabitos = response.content;
        this.totalElements = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      },
      error: () => this.showSnackBar('Error al cargar la lista de Habitos'),
    });
  }
  
  
  
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredHabitos = this.habitos.filter((habito) =>
      habito.nombre_habito.toLowerCase().includes(filterValue)
    );
    console.log('Habitos filtrados: ', this.filteredHabitos);  // Verifica los datos filtrados
  }
  
  onPageChange(event: PageEvent):void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHabitos(this.pageIndex, this.pageSize);
  }
  createNewHabito():void{
    this.router.navigate(['/customer/habitos/crear']);
  }
  editHabito(habitoId: number):void {
    this.router.navigate(['/customer/habitos/edit', habitoId])
  }
  createNewMeta():void{
    this.router.navigate(['/customer/metas/list'])
  }
    
  deleteHabito(habitoId: number):void {
    if(confirm('¿Estás seguro de que desaeas eliminar este Habito')){
      this.HabitoService.deleteHabito(habitoId).subscribe({
        next: () => {
          this.showSnackBar('Habito eliminado exitosamente');
          this.loadHabitos(this.pageIndex, this.pageSize);
        },
        error:() => this.showSnackBar('Error al eliminar el habito'),
      });
    }
  }
  
  
  private showSnackBar(message: string):void{
    this.snackbar.open(message, 'Cerrar',{
    duration: 3000,
  });
}
}
