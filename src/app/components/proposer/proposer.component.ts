import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from 'src/app/models/film';
import { format } from 'path';

@Component({
  selector: 'app-proposer',
  templateUrl: './proposer.component.html',
  styleUrls: ['./proposer.component.css']
})
export class ProposerComponent implements OnInit {
  film: Film = {
    auteur: '',
    email: '',
    titre: '',
    accroche: '',
    genre: [],
    pitch: '',
    note: '',
    casting: '',
    published: false,
    nbVotesPublic: 0,
    nbVotesAdmin: 0,
    nbStarsPublic: 0,
    nbStarsAdmin: 0,
    score:0,
    dateCreation: Date.now(),
    classe:'detail'
  };
  // filmForm: FormGroup;
  constructor(
    // private fb : FormBuilder,
    private crud: CrudservService
  ) {

  }
  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {
  }
  /////////////////////////////////////////////////////////////////
  proposer() {
    console.log('on poste');
  
    this.crud.creerFilm(this.film);

    /* let envoiAdmin = {
       to: 'melvdv@yahoo.fr',// sera remplacé par lamine.comics
       subject:'Nouveau film posté',
       text:'Bonjour Mathieu, veuillez cliquer sur ce lien pour consulter la participation au projet de '+this.film.auteur+'.'
        }
  // this.crud.mail(envoiAdmin).subscribe(()=>{
     //  console.log('mail envoyé');
  //  });
       //------------
     //  let envoiPart = {
       //  to: this.film!.email,
      //   subject:'Accusé de réception',
      //   text:'Bonjour '+this.film!.auteur+', nous vous remercions pour votre participation au projet "Le film qui n\'existait pas". Vous serez prévenus lorsque votre idée sera publiée.'
      //     }
  //     this.crud.mail(envoiPart).subscribe(()=>{
     //    console.log('mail envoyé');
     //  });/*/
  }

  ///////////////////////////////////////////////////////////////////
  clikIdee = false;
  fini = false;
  ideeRandom = 'journal';
  idees = [
    "idee1", "idee2", "idee3", "idee4", "idee5", "idee6"
  ];
  random() {
    this.clikIdee = true;
    let i = Math.floor(this.idees.length * Math.random());
    this.ideeRandom = this.idees[i];
    this.idees.splice(i, 1);
    if (this.idees.length === 0) { this.ideeRandom = 'journal'; }
  }
  ////////////////////////////////////////////////////////////////////
  selection = 0;
  select(nb: any): void {
    this.selection = nb;
  }
  //------------------------------
  aide = 0;
  aider(nb: any): void {
    this.aide = nb;
  }
  fermerAide(): void {
    this.aide = 0;
  }
  //---------------
quoi(coche:boolean, genre:string){
  if(coche){
 this.film.genre.push(genre);
  }
  else{
this.film.genre = this.film.genre.filter(e=> e!== genre);
  }
}
}




