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

  ngOnInit() {
    this.critere = 'date';
    this.crud.getFilmsPubl().subscribe((data) => {
      this.prefilms$ = data;
      this.films$ = data;
      this.trierPar('date');
      this.films$.forEach((e: any) => {
        e.score = Math.floor(e.nbStarsPublic / e.nbVotesPublic);
      });
    });
  }
  //-------------------
  choisir(choix: any) {
    this.critere = choix;
    switch (choix) {
      case 'voteP': this.trierPar('voteP'); break;
      case 'voteA': this.trierPar('voteA'); break;
      case 'date': this.trierPar('date'); break;
      case 'motcle': break;
      default: console.log('choix du genre');
    }
  }
  //--------------------
  trierPar(choix: any) {
    let sort;
    switch (choix) {
      case 'date': sort = (a: any, b: any) => b.dateCreation - a.dateCreation; break;
      case 'voteP': sort = (a: any, b: any) => b.score - a.score; break;
      case 'voteA': (a: any, b: any) => b.nbStarsAdmin - a.nbStarsAdmin; break;
      default: console.log('autre');
    }
    this.films$ = this.prefilms$!.slice().sort(sort);
  }
  //--------------------
  choisirGenre(choix: string) {
    this.films$ = this.prefilms$!.slice().filter((e: any) =>
      e.genre.includes(choix) === true
    );
  }
  //-----------------------
  motcle = '';
  rechMotcle() {
    let tri: any = [];
    this.motcle.split(' ').forEach((f: any) => {
      let tabx = this.prefilms$!.slice().filter((e: any) =>
        e.titre.split(' ').includes(f) === true ||
        e.accroche.split(' ').includes(f) === true ||
        e.casting.split(' ').includes(f) === true ||
        e.pitch.split(' ').includes(f) === true ||
        e.note.split(' ').includes(f) === true
      );
      tri = tri.concat(tabx);
    });
    this.films$ = tri;
  }
  //---------------------
  foncer(id: number) {
    this.films$![id].classe = "detail select";
  }
  defoncer(id: number) {
    this.films$![id].classe = "detail";
  }
  //-----------------
  nav(id: string) {
    this.router.navigate([`/detail/${id}`]);
  }
}
