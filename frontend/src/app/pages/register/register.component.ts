import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private userService: UserService
  ) { }

  user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  onSubmit(form: NgForm) {
    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error al obtener los datos', err);  // Manejo de errores
      }
    });
  }
}
