import { CrudservService } from './../../services/crudserv.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  detail!:Film;
  filmId = '';
  sub: Subscription;
  constructor(
    private crud: CrudservService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sub = this.activatedRoute.paramMap.subscribe((params: any) => {
      this.filmId = params.get('id');
    })

  }

  ngOnInit(): void {

    this.crud.afficherDetail(this.filmId).subscribe(data=>{
this.detail=data;
    });
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}