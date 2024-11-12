// core/pipes/estado-recurso.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'estadoRecurso'
})
export class EstadoRecursoPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'Activo':
                return '🟢 Activo';
            case 'En revisión':
                return '🟡 En revisión';
            case 'Archivado':
                return '🔴 Archivado';
            default:
                return value;
        }
    }
}
