import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-password-recovery-confirmation',
  standalone: true,
  imports: [MatButtonModule, MatCardActions, MatCardContent, MatCard, MatCardHeader, MatCardModule],
  templateUrl: './password-recovery-confirmation.component.html',
  styleUrl: './password-recovery-confirmation.component.scss'
})
export class PasswordRecoveryConfirmationComponent {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}