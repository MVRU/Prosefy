import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

interface Edicion {
  nombre: boolean;
  email: boolean;
  apellido: boolean;
  username: boolean;
};

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {
  usuario: any = {};
  editando = false;

  edicion = {
    nombre: false,
    email: false,
    apellido: false,
    username: false,
  };

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    // Obtener los valores del usuario y asignarlos a las propiedades del componente
    this.usuarioService.getNombre().subscribe(
      (data: any) => {
        this.usuario.nombre = data.data.nombre;
      },
      (error: any) => {
        console.error('Error obteniendo nombre:', error);
      }
    );

    this.usuarioService.getApellido().subscribe(
      (data: any) => {
        this.usuario.apellido = data.data.apellido;
      },
      (error: any) => {
        console.error('Error obteniendo apellido:', error);
      }
    );

    this.usuarioService.getEmail().subscribe(
      (data: any) => {
        this.usuario.email = data.data.email;
      },
      (error: any) => {
        console.error('Error obteniendo email:', error);
      }
    );

    this.usuarioService.getUsername().subscribe(
      (data: any) => {
        this.usuario.username = data.data.username;
      },
      (error: any) => {
        console.error('Error obteniendo nombre de usuario:', error);
      }
    );
  }


  toggleEdicion(campo: keyof Edicion) {
    this.edicion[campo] = !this.edicion[campo];
  }

  guardarCambios() {
    // Itera sobre los campos en edición y actualiza
    (Object.keys(this.edicion) as (keyof Edicion)[]).forEach((campo: keyof Edicion) => {
      if (this.edicion[campo] && this.usuario[campo] !== '') {
        this.actualizarCampo(campo, this.usuario[campo]);
      }
    });
  }

  actualizarCampo(campo: keyof Edicion, nuevoValor: any) {
    switch (campo) {
      case 'nombre':
        this.usuarioService.setNombre(nuevoValor).subscribe(
          (response) => {
            console.log(`Éxito al actualizar ${campo}:`, response);
            this.edicion[campo] = false; // Desactiva la edición para el campo específico
          },
          (error) => console.error(`Error al actualizar ${campo}:`, error)
        );
        break;
      case 'apellido':
        this.usuarioService.setApellido(nuevoValor).subscribe(
          (response) => {
            console.log(`Éxito al actualizar ${campo}:`, response);
            this.edicion[campo] = false; // Desactiva la edición para el campo específico
          },
          (error) => console.error(`Error al actualizar ${campo}:`, error)
        );
        break;
      case 'email':
        this.usuarioService.setEmail(nuevoValor).subscribe(
          (response) => {
            console.log(`Éxito al actualizar ${campo}:`, response);
            this.edicion[campo] = false; // Desactiva la edición para el campo específico
          },
          (error) => console.error(`Error al actualizar ${campo}:`, error)
        );
        break;
      case 'username':
        this.usuarioService.setUsername(nuevoValor).subscribe(
          (response) => {
            console.log(`Éxito al actualizar ${campo}:`, response);
            this.edicion[campo] = false; // Desactiva la edición para el campo específico
          },
          (error) => console.error(`Error al actualizar ${campo}:`, error)
        );
        break;
      default:
        console.log(`Campo no manejado: ${campo}`);
    }
  }

  updateNombre(): void {
    this.usuarioService.setNombre('nombre').subscribe(
      (response) => console.log('Éxito:', response),
      (error) => console.error('Error:', error)
    );
  }

  updateApellido(): void {
    this.usuarioService.setApellido('apellido').subscribe(
      (response) => console.log('Éxito:', response),
      (error) => console.error('Error:', error)
    );
  }

  updateEmail(): void {
    this.usuarioService.setEmail('email').subscribe(
      (response) => console.log('Éxito:', response),
      (error) => console.error('Error:', error)
    );
  }

  updateUsername(): void {
    this.usuarioService.setUsername('username').subscribe(
      (response) => console.log('Éxito:', response),
      (error) => console.error('Error:', error)
    );
  }
}