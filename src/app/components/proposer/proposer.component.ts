import { Router } from '@angular/router';
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
acteur1= '';
acteur2='';
public acteur3='';
public acteur4='';
public role1='';
public role2='';
public role3='';
public role4='';
  film: Film = {
    auteur: '',
    email: '',
    titre: '',
    accroche: 'Et si ...',
    genre: [],
    pitch: '',
    note: '',
    casting: [
      {'acteur': this.acteur1, 'role': this.role1}, 
      {'acteur': this.acteur2, 'role': this.role2}, 
      {'acteur': this.acteur3, 'role': this.role3}, 
      {'acteur': this.acteur4, 'role': this.role4}, 
  ],
    published: false,
    nbVotesPublic: 0,
    nbStarsPublic: 0,
    nbStarsAdmin: 0,
    score:0,
    dateCreation: Date.now(),
    classe:'detail',
    url: "https://firebasestorage.googleapis.com/v0/b/lfqnep.appspot.com/o/affiches%2Fdefaut%2Fdefaut.png?alt=media&token=2db2301d-db8c-4ab9-a562-7098c2735fae"
  };
  // filmForm: FormGroup;
  constructor(
    // private fb : FormBuilder,
    private crud: CrudservService,
    private msg: MessagerieService,
    private router : Router
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
       this.fini=true;
       setTimeout(() => {
         this.router.navigate([`/`]);
       }, 5);
     });
  }

  ///////////////////////////////////////////////////////////////////
  warning='';
  attention(){
    this.warning='';
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
    this.aide= false;
    let i = Math.floor(this.idees.length * Math.random());
    this.ideeRandom = this.idees[i];
    this.idees.splice(i, 1);
    if (this.idees.length === 0) { this.ideeRandom = 'journal'; this.idees=  [
      "idee1", "idee2", "idee3", "idee4", "idee5", "idee6"
    ]; }
  }
  ////////////////////////////////////////////////////////////////////
  selection = 0;
  select(nb: any, id:string): void {
    this.selection = nb;
    let tous= ['film','genre','resume','casting','note','bonus','envoi'];
    tous.forEach((e:any)=>{
      document.getElementById(e)?.classList.remove('selectionne');
    })
    document.getElementById(id)?.classList.add('selectionne');
  }
  //------------------------------
  aide = false;
  aider(nb: any): void {
    this.aide=true;
    switch(nb){
      case 1: this.warning= 'Attention, il ne s\'agit PAS de parler de projets de films qui ont existé et ont capoté (comme par exemple "Dune" de Jodorowsky ou "Napoléon" de Kubrick).'; break;
      case 2: this.warning= 'L\'accroche doit obligatoirement commencer par "Et si..."'; break;
      case 3: this.warning= ''; break;
      case 4: this.warning= ''; break;
      case 5: this.warning= ''; break;
    }
  }

  //---------------
public fantastique!:boolean;
public policier!:boolean;
public romance!:boolean;
public thriller!:boolean;
public biographie!:boolean;
public dystopique!:boolean;
public peplum!:boolean;
public action!:boolean;
public sf!:boolean;
public drame!:boolean;
public western!:boolean;
public horreur!:boolean;
public comedie!:boolean;
public historique!:boolean;

cocherGenre(genre:string,value:boolean){

  if(value){
    this.film.genre.push(genre);
  }
  else{
    this.film.genre = this.film.genre.filter(e=> e!== genre);
  }


switch(genre){

  case 'fantastique': this.fantastique= value; break;
  case 'policier': this.policier= value; break;
  case 'romance': this.romance= value; break;
  case 'thriller': this.thriller= value; break;
  case 'biographie': this.biographie= value; break;
  case 'dystopique': this.dystopique= value; break;
  case 'peplum': this.peplum= value; break;
  case 'action': this.action= value; break;
  case 'sf': this.sf= value; break;
  case 'drame': this.drame= value; break;
  case 'western': this.western= value; break;
  case 'horreur': this.horreur= value; break;
  case 'comedie': this.comedie= value; break;
  case 'historique': this.historique= value; break;
  default: console.log('blem');
}
}


/////////////////////////////////
retour(){
  this.router.navigate([`/`]);
}

}




