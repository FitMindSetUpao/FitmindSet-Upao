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
  recursoid: number;
  private route = inject(ActivatedRoute);

  constructor() {
    this.recursoid = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.recursoid);
  }
}
