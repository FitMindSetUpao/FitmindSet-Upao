import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitoFormComponent } from './habito-form.component';

describe('HabitoFormComponent', () => {
  let component: HabitoFormComponent;
  let fixture: ComponentFixture<HabitoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
