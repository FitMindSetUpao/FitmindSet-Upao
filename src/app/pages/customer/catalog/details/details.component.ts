import {Component, inject} from '@angular/core';
import { RecursoDetailsComponent} from '../../../../shared/components/recurso-details/recurso-details.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RecursoDetailsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  recursoId: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.recursoId = +this.route.snapshot.paramMap.get('recursoId')!;
    console.log(this.recursoId);
  }
}
