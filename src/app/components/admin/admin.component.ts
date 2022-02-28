import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private crud: CrudservService
  ) { }
  attentes$?: Film[];
  ngOnInit(): void {
    this.crud.getFilmsNoPubl().subscribe(data => {
      this.attentes$ = data;
    });
  }
  //-----------
  async publish(id:any){
   await this.crud.publier(id);
  }

}
