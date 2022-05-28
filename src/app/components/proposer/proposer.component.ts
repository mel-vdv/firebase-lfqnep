import { MessagerieService } from './../../services/messagerie.service';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from 'src/app/models/film';

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
    nbStarsPublic: 0,
    nbStarsAdmin: 0,
    score:0,
    dateCreation: Date.now(),
    classe:'detail',
    url: ["https://firebasestorage.googleapis.com/v0/b/lfqnep.appspot.com/o/affiches%2Fdefaut%2Fdefaut.png?alt=media&token=2db2301d-db8c-4ab9-a562-7098c2735fae"]
  };
  // filmForm: FormGroup;
  constructor(
    // private fb : FormBuilder,
    private crud: CrudservService,
    private msg: MessagerieService
  ) {

  }
  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {
  }
  /////////////////////////////////////////////////////////////////
  proposer() {
    // action 1 :
   this.crud.creerFilm(this.film);
    // action 2 :
     this.selection=7;
    // action 3 : mail1
     let mail1= {
      to: "melvdv@yahoo.fr" ,// sera remplacé par lamine.comics
      subject:'Nouveau projet de film posté',
      text:'Bonjour M.La Mine, veuillez cliquer sur ce lien pour consulter la participation au projet de '+this.film.auteur+': https://lfqnep.web.app/admin'
     }
     this.msg.envoiMail(mail1).subscribe(()=>{
       console.log('ok envoyé done');
     });
    // action 4 : mail2:
     let mail2= {
      to: this.film.email,
      subject:'Accusé de réception',
      text:'Bonjour '+this.film!.auteur+', nous vous remercions pour votre participation au projet collaboratif "Le film qui n\'existait pas". Vous serez prévenu lorsque votre idée sera illustrée et publiée.'
    
     }
     this.msg.envoiMail(mail2).subscribe(()=>{
       console.log('ok envoyé done');
     });
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




