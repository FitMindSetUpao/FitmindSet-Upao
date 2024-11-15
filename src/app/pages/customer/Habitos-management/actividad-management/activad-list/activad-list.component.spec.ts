import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivadListComponent } from './activad-list.component';

describe('ActivadListComponent', () => {
  let component: ActivadListComponent;
  let fixture: ComponentFixture<ActivadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
