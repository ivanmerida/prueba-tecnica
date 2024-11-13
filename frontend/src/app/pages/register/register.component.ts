import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
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
  ngAfterViewInit() {
    // Agregar animación al formulario de login
    $('.register-form').fadeIn(2000);
  }

  // método para registrar
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


  // ver y ocultar contraseña
  showPassword(id: string, idShowPassword: string) {
    const password = <HTMLInputElement>document.getElementById(id)!;
    const show_password = <HTMLInputElement>document.getElementById(idShowPassword)!;

    if (password.type == 'password') {
      password.type = 'text';
      show_password.src = "../../../assets/img/eye-open.svg";

      setTimeout(function () {
        password.type = 'password';
        show_password.src = "../../../assets/img/eye-close.svg";
      }, 3000);

    } else {
      password.type = 'password';
      show_password.src = "../../../assets/img/eye-close.svg";
    }
  }
}
