import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  constructor(
    private userService: UserService,
  ) { }

  user = {
    name: '',
    surname: '',
    email: ''
  }

  ngOnInit(): void {
    const data = this.userService.getUserData();
    console.log(data);

    if (data) {
      // Si los datos existen, asignamos las propiedades correspondientes
      this.user.name = data.name || '';
      this.user.surname = data.surname || '';
      this.user.email = data.email || '';

      console.log(this.user);
    } else {
      console.warn('No se encontraron datos de usuario.');
    }
  }


}
