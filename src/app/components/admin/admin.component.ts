import { Router } from '@angular/router';
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
    private crud: CrudservService,
    private router: Router
  ) { }
  attentes$?: Film[];
  films$?: Film[];
  //------------------
  ngOnInit(): void {
    this.crud.getFilmsNoPubl().subscribe(data => {
      this.attentes$ = data;
    });
    this.crud.getFilmsPubl().subscribe(data => {
      this.films$ = data;
    })
  }
  //-----------
 
  nav(id: string) {
    this.router.navigate([`/editer/${id}`]);
  }


}
