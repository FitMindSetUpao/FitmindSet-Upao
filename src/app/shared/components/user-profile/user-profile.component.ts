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
  profile!: UserProfile;  // Usamos el 'non-null assertion operator' para indicar que este campo siempre será inicializado
  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userCorreo = authData?.rol;  // Parece que 'rol' es el correo, si es así, asegúrate de que la variable esté bien nombrada

    console.log('User correo:', userCorreo);  // Verifica si el correo es correcto
    if (userCorreo) {
      this.userProfileService.getUserProfile(userCorreo).subscribe({
        next: (profile) => {
          console.log('Perfil cargado:', profile);  // Verifica si 'profile' tiene los datos correctos
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {
          console.error('Error al cargar el perfil:', error);
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
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  deactivateAccount(): void {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.userProfileService.deleteUser(this.profile.id).subscribe({
        next: () => {
          this.snackBar.open('Cuenta eliminada exitosamente', 'Cerrar', { duration: 3000 });
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
