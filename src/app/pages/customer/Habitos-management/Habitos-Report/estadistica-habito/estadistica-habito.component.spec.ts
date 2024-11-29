import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaHabitoComponent } from './estadistica-habito.component';

describe('EstadisticaHabitoComponent', () => {
  let component: EstadisticaHabitoComponent;
  let fixture: ComponentFixture<EstadisticaHabitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaHabitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaHabitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
