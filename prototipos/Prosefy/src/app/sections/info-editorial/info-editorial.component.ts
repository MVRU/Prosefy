import { Component, OnInit } from '@angular/core';
import { EditorialesService } from 'src/app/services/editoriales.service';
import { Editorial } from 'src/app/models/editorial.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-editorial',
  templateUrl: './info-editorial.component.html',
  styleUrls: ['./info-editorial.component.css']
})
export class InfoEditorialComponent implements OnInit {
  editorial$!: Observable<Editorial | undefined>;

  constructor(
    private route: ActivatedRoute,
    private editorialesService: EditorialesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editorial$ = this.editorialesService.getEditorial(id);
    }
  }
}
