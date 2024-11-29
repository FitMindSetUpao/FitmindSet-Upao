// metrics-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetricsStorageService {
  private storageKey = 'fitnessMetrics';

  getMetrics(): { weight: number; height: number; date: string }[] {
    const savedMetrics = localStorage.getItem(this.storageKey);
    return savedMetrics ? JSON.parse(savedMetrics) : [];
  }

  saveMetrics(metrics: { weight: number; height: number; date: string }[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(metrics));
  }
}
