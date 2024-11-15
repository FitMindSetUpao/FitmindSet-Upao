import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryConfirmationComponent } from './password-recovery-confirmation.component';

describe('PasswordRecoveryConfirmationComponent', () => {
  let component: PasswordRecoveryConfirmationComponent;
  let fixture: ComponentFixture<PasswordRecoveryConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRecoveryConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordRecoveryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
