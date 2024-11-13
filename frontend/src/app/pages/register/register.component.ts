import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { showPassword } from '../../helpers/showPassword';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
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
    // valida si las contraseñas nueva coinciden
    if (this.validatePasswords()) {
      return;
    }
    this.userService.register(this.user).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status !== 'success') {
          this.toastr.error(response.message, 'Error');
          return;
        }
        this.toastr.success('El usuario se registro correctamente', 'Exito');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error('Error al registrar los datos', 'Error de servidor');
      }
    });
  }

  validatePasswords(): boolean {
    if (this.user.password !== this.user.confirmPassword) {
      this.toastr.error('Las nuevas contreñas no coinciden', 'Error');
      return true;
    }
    return false;
  }

  // ver y ocultar contraseña
  showPassword(id: string, idShowPassword: string) {
    showPassword(id, idShowPassword);
  }
}
