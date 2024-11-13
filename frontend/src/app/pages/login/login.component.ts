import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  user = {
    email: '',
    password: ''
  }

  onSubmit(form: NgForm) {
    console.log(this.user);

    this.userService.login(this.user).subscribe({
      next: (response) => {
        const data = response.data;
        this.userService.setUserData(JSON.stringify(data)); // guardamos la data en el localstorage
        this.router.navigate(['/panel']);
      },
      error: (err) => {
        console.error('Error al obtener los datos', err);  // Manejo de errores
      }
    });
  }
}
