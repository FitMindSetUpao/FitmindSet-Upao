// update-fit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { MetricsStorageService } from '../../core/services/metrics-storage.service';
import { BaseMetricsService } from '../../core/services/base-metrics.service';

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
  originalWeight: number | null = null;
  originalHeight: number | null = null;
  metricEntries: { weight: number; height: number; date: string }[] = [];

  constructor(
    private metricsStorageService: MetricsStorageService,
    private baseMetricsService: BaseMetricsService
  ) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadBaseMetrics();
  }

  updateMetrics() {
    if (this.weight && this.height) {
      const newEntry = {
        weight: this.weight,
        height: this.height,
        date: new Date().toLocaleDateString()
      };
      this.metricEntries.push(newEntry);
      this.metricsStorageService.saveMetrics(this.metricEntries);

      // Guardar la base actualizada y mostrar en el recuadro de datos originales
      this.baseMetricsService.saveBaseMetrics(this.weight, this.height);
      this.originalWeight = this.weight;
      this.originalHeight = this.height;

      this.weight = null;
      this.height = null;
    }
  }

  loadMetrics() {
    this.metricEntries = this.metricsStorageService.getMetrics();
  }

  loadBaseMetrics() {
    const baseMetrics = this.baseMetricsService.getBaseMetrics();
    this.originalWeight = baseMetrics.weight;
    this.originalHeight = baseMetrics.height;
    this.weight = baseMetrics.weight;
    this.height = baseMetrics.height;
  }

  hasUnsavedChanges(): boolean {
    return !!this.weight || !!this.height;
  }
}
