import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComentarioService } from 'src/app/services/comentario-service.service';
import { IniciarSesionService } from 'src/app/services/iniciar-sesion.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nuevo-comentario',
  templateUrl: './nuevo-comentario.component.html',
  styleUrls: ['./nuevo-comentario.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  standalone: true,
})

export class NuevoComentarioComponent {
  comentarioForm = this.formBuilder.group({
    comentario: ['', [/*Validators.required*/]]
  });
  comentario!: string;
  allComentarios: string[] = [];
  isLoggedIn: boolean = false;

  constructor(private ComentarioService: ComentarioService, private formBuilder: FormBuilder, private iniciarSesionService: IniciarSesionService) { }

  ngOnInit() {
    this.iniciarSesionService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  getComentarios() {
    this.allComentarios = this.ComentarioService.getComentarios();
  }

  addComment(): void {

    console.log(this.comentario);
    if (this.comentarioForm.valid) {
      this.ComentarioService.agregarComentario(this.comentario);
    }
  }

  get email() {
    return this.comentarioForm.controls.comentario;
  }
}
