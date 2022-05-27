import { CrudservService } from './../../services/crudserv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private crud: CrudservService
  ) { }
  //////////////////////////////////////
  filmId!: string;
  detail: any;
  //////////////////////////////////////
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: any) => {
      this.filmId = params.get('id');

      this.crud.afficherDetail(this.filmId).subscribe(data => {
        this.detail = data;
      });
    });
  }
  ///////////////////////////////
  nav() {
    this.router.navigate([`/admin`]);
  }
  ////////////////////////////////////////////       EDITER       /////////////////////////////////////////////
  crayonVis = false;
  editer1() {
    this.crayonVis = true;
  }
  modifTitre = false;modifAccroche = false;modifPitch = false;modifGenre = false;modifCasting = false;modifNote = false;modifAffiche = false;
  editer2(rubrique: string) {
    switch (rubrique) {
      case 'titre': this.modifTitre = true; break;
      case 'accroche': this.modifAccroche = true;  break;
      case 'pitch': this.modifPitch = true;  break;
      case 'genre': this.modifGenre= true; this.detail.genre=[]; break;
      case 'casting': this.modifCasting= true;break;
      case 'note': this.modifNote = true; break;
      case 'affiche': this.modifAffiche = true;  break;
      default: console.log('blem');
    }
  }
  messageEVis = false;
  editer3() {
    this.messageEVis = true;
  }
  //-----------
  editer4() {
    this.messageEVis = false;
    this.messageP2Vis = true;
    let modif = this.detail;
    this.crud.editer(this.filmId, modif);
  }
  //----------- GENRE :
  quoi(coche:boolean, genre:string){
    if(coche){
   this.detail.genre.push(genre);
    }
    else{
  this.detail.genre = this.detail.genre.filter((e:any)=> e!== genre);
    }
  }
  ////////////////////////////////////////////       PUBLIER      /////////////////////////////////////////////

  messagePVis = false;
  messageP2Vis = false;
  publier1() {
    this.messagePVis = true;
  }
  publier2() {
    this.crud.publier(this.filmId);
    this.messagePVis = false;
    this.nav();
  }
  //-----------
  ////////////////////////////////////////////       SUPPRIMER       /////////////////////////////////////////////

  messageSVis = false;
  delete1() {
    this.messageSVis = true;
  }
  //-----------
  delete2() {
    this.crud.supprimer(this.filmId);
    this.messageSVis = false;
    this.nav();
  }
}
