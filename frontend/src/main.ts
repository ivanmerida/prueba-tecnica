import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,  // Añadimos los proveedores de appConfig
    importProvidersFrom(
      BrowserAnimationsModule,  // Necesario para las animaciones de ngx-toastr
      ToastrModule.forRoot({    // Configuración de Toastr
        timeOut: 3000,           // Duración de la alerta
        positionClass: 'toast-top-right',  // Posición de la alerta
        preventDuplicates: true, // Evitar alertas duplicadas
      })
    ),
  ]
}).catch((err) => console.error(err));
