import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { showPassword } from '../../helpers/showPassword';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
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
        console.log(response);
        if (response.status !== 'success' && !response.data) {
          this.toastr.error(response.message, 'Error');
          return;
        }
        const data = response.data;
        const token = response.token;
        this.userService.setUserData(JSON.stringify(data)); // guardamos la data en el localstorage
        localStorage.setItem('userToken', JSON.stringify(token));
        this.router.navigate(['/panel']);
      },
      error: (err) => {
        this.toastr.error('Error al obtener los datos', 'Error de servidor');
      }
    });
  }

  // ver y ocultar contraseña
  showPassword(id: string, idShowPassword: string) {
    showPassword(id, idShowPassword);
  }
}
