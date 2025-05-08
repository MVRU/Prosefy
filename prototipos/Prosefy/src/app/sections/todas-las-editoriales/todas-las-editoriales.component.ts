import { Component, OnInit } from '@angular/core';
import { EditorialesService } from '../../services/editoriales.service';
import { Editorial } from 'src/app/models/editorial.interface';

@Component({
  selector: 'app-todas-las-editoriales',
  templateUrl: './todas-las-editoriales.component.html',
  styleUrls: ['./todas-las-editoriales.component.css']
})
export class TodasLasEditorialesComponent implements OnInit {
  editoriales: Editorial[] = [];
  currentPage = 1;
  itemsPerPage = 12;

  constructor(private editorialesService: EditorialesService) { }

  ngOnInit(): void {
    this.editorialesService.getEditoriales().subscribe({
      next: (data: Editorial[]) => {
        this.editoriales = data;
      },
      error: (err) => console.error('Error al obtener las editoriales', err)
    });
  }

  get totalPages(): number {
    const pages = Math.ceil(this.editoriales.length / this.itemsPerPage);
    return pages > 0 ? pages : 1;
  }

  pageChanged(page: number): void {
    const total = this.totalPages;
    if (page < 1) {
      this.currentPage = 1;
    } else if (page > total) {
      this.currentPage = total;
    } else {
      this.currentPage = page;
    }
  }
}