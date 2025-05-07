import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoresService, Autor } from '../../services/autores.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-info-autor',
  templateUrl: './info-autor.component.html',
  styleUrls: ['./info-autor.component.css']
})
export class InfoAutorComponent implements OnInit {
  autor$!: Observable<Autor | undefined>;

  constructor(
    private route: ActivatedRoute,
    private autoresService: AutoresService
  ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const decodedId = decodeURIComponent(param);
      this.autor$ = this.autoresService.getAutor(decodedId);
    }
  }
}