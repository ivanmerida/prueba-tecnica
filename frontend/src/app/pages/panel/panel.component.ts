import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, FormatDatePipe],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
  providers: [
    DatePipe
  ]
})
export class PanelComponent implements OnInit {
  public user: any = {};
  public texto = 'hola mundo';
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // se manda a llamar la data del usuario si este ya esta registrado
    const data = this.userService.getUserData();

    if (data) {
      // Si los datos existen, asignamos las propiedades correspondientes
      this.user = JSON.parse(data);
    } else {
      console.warn('No se encontraron datos de usuario.');
    }
  }

  //cerrar sesión
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  // Método para descargar el PDF
  downloadPDF() {
    this.userService.getReport(this.user).subscribe({
      next: (response: Blob) => {
        // Crear un enlace para descargar el archivo
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'reporte_usuario.pdf'; // Nombre del archivo que se descargará
        link.click();
        URL.revokeObjectURL(url); // Revocar el enlace para liberar memoria

      },
      error: (error) => {
        this.toastr.error('Error al descargar el PDF', 'Error de servidor');
      }
    });
  }
}
