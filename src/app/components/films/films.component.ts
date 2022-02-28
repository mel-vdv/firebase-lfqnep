import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
films$?: Film[];

  constructor(
    private crud: CrudservService
  ) { }

  async ngOnInit(){
    await this.crud.getFilmsPubl().subscribe((data)=>{
      this.films$ = data;
    });
  }

}
