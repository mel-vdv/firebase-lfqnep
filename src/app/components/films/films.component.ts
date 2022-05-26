import { Router } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
films$!: Film[];
prefilms$!: Film[];
critere!: string;

  constructor(
    private crud: CrudservService,
    private router: Router
  ) { }

 ngOnInit(){
   this.critere= 'date';
  this.crud.getFilmsPubl().subscribe((data)=>{
      this.prefilms$ = data;
      this.films$=data;
      this.films$.forEach((e:any)=>{
        e.score= Math.floor(e.nbStarsPublic / e.nbVotesPublic) ;
       
      });
    });
  }
//-------------------
choisir(choix:any){
  this.critere = choix;
}
//--------------------
choisirGenre(choix:string){
  this.films$ = this.prefilms$!.slice().filter((e:any)=>
    e.genre.includes(choix) === true
  );
}
//---------------------
foncer(id:number){
  this.films$![id].classe = "detail select";
}
defoncer(id:number){
  this.films$![id].classe = "detail";
}
//-----------------
nav(id:string){
this.router.navigate([`/detail/${id}`]);
}
}
