import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { UpdateFitService } from '../../core/services/update-fit.service';

@Component({
  selector: 'app-update-fit',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './update-fit.component.html',
  styleUrls: ['./update-fit.component.scss']
})
export class UpdateFitComponent implements OnInit {
  weight: number | null = null;
  height: number | null = null;
  metricEntries: { weight: number; height: number; date: string }[] = [];

  constructor(private updateFitService: UpdateFitService) {}

  ngOnInit() {
    this.loadMetrics();
  }

  updateMetrics() {
    if (this.weight && this.height) {
      const newEntry = {
        weight: this.weight,
        height: this.height,
        date: new Date().toLocaleDateString()
      };
      this.metricEntries.push(newEntry);
      this.updateFitService.saveMetrics(this.metricEntries);
      this.weight = null;
      this.height = null;
    }
  }

  loadMetrics() {
    this.metricEntries = this.updateFitService.getMetrics();
  }
}
