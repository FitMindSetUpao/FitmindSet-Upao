import { Component } from '@angular/core';
import { UserProfileService } from 'src/app/core/services/user-profile.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = { name: '', email: '' };

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((data) => (this.user = data));
  }

  updateProfile(): void {
    this.userProfileService.updateUserProfile(this.user).subscribe(
      () => alert('Perfil actualizado con éxito'),
      (error) => console.error(error)
    );
  }
}
