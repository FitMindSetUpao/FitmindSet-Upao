import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from '../../../core/services/user-profile.services';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/user-profile.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserProfileService);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const usercorreo = authData?.correo;
    if (usercorreo) {
      this.userProfileService.getUserProfile(usercorreo).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {
      this.showSnackBar('Usuario no autenticado');
      this.router.navigate(['/auth/login']);
    }
  }

  navigateToUpdateProfile(): void {
    this.router.navigate(['/mi-perfil/actualizar']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

  deactivateAccount() {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.userService.deleteUser(this.profile.id).subscribe({
        next: () => {
          // Muestra mensaje de éxito
          this.snackBar.open('Cuenta eliminada exitosamente', 'Cerrar', { duration: 3000 });
          
          // Cierra la sesión y redirige al usuario al login
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error al eliminar la cuenta:', err);
          this.snackBar.open('Error al eliminar la cuenta', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
  
  
  
}
