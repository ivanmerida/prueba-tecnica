import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import $ from 'jquery';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  user = {
    email: '',
    password: ''
  }

  ngAfterViewInit() {
    // Agregar animación al formulario de login
    $('.login-form').fadeIn(2000);
  }
  // método de autenticación
  onSubmit(form: NgForm) {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        const data = response.data;
        const token = response.token;
        this.userService.setUserData(JSON.stringify(data)); // guardamos la data en el localstorage
        localStorage.setItem('userToken', JSON.stringify(token));
        this.router.navigate(['/panel']);
      },
      error: (err) => {
        console.error('Error al obtener los datos', err);  // Manejo de errores
      }
    });
  }

  // ver y ocultar contraseña
  showPassword() {
    const password = <HTMLInputElement>document.getElementById('password')!;
    const show_password = <HTMLInputElement>document.getElementById('show-password')!;

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
