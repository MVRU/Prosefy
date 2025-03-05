import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodasLasEditorialesComponent } from 'src/app/sections/todas-las-editoriales/todas-las-editoriales.component';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css'],
  imports: [CommonModule, RouterModule, TodasLasEditorialesComponent],
  standalone: true,
})
export class EditorialesComponent {

}
