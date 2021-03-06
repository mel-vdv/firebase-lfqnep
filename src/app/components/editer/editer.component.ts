import { MessagerieService } from './../../services/messagerie.service';
import { CrudservService } from './../../services/crudserv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-editer',
  templateUrl: './editer.component.html',
  styleUrls: ['./editer.component.css']
})
export class EditerComponent implements OnInit {

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private crud: CrudservService,
    private afStorage: AngularFireStorage,
    private msg : MessagerieService
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
  modifTitre = false; modifAccroche = false; modifPitch = false; modifGenre = false; modifCasting = false; modifNote = false; modifAffiche = false;
  editer2(rubrique: string) {
    switch (rubrique) {
      case 'titre': this.modifTitre = true; break;
      case 'accroche': this.modifAccroche = true; break;
      case 'pitch': this.modifPitch = true; break;
      case 'genre': this.modifGenre = true; this.detail.genre = []; break;
      case 'casting': this.modifCasting = true; break;
      case 'note': this.modifNote = true; break;
      case 'affiche': this.modifAffiche = true; break;
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
  quoi(coche: boolean, genre: string) {
    if (coche) {
      this.detail.genre.push(genre);
    }
    else {
      this.detail.genre = this.detail.genre.filter((e: any) => e !== genre);
    }
  }
  //----------- AFFICHE :----------------------------------------------------------------
  photo = {
    titre: this.filmId,
    file: ''
  }
  urlServeur$: any;
  urlImage: any;
  laRef: any; leUpload: any;
  choisirPhoto(photoChoisie: any) {
    this.photo.file = photoChoisie.target.files[0];
  }
  uploader() {
    // ETAPE 1 : cr??er dossier et image dans storage de firebase:
    const leChemin = `affiches/${this.filmId}/${this.photo.titre}`;
    this.laRef = this.afStorage.ref(leChemin);
    this.leUpload = this.afStorage.upload(leChemin, this.photo.file);
    // mettre ?? jour/cr??er le champ 'urlPhotos' dans firestore dbb de firebase :
    this.enregistrerPhoto();
    
  }
  enregistrerPhoto() {
    this.leUpload.snapshotChanges() //on l'??coute, il renvoie un observable
      //on veut r??cup??rer l'url de la photo upload??e 
      .pipe(
        finalize(() => {//operateur de rxjs pour laisser le temps au serveur de r??cup??rer url
          this.urlServeur$ = this.laRef.getDownloadURL();//retourne un observable :
          //on s'y abonne:
          this.urlServeur$.subscribe((data: any) => {
            this.urlImage = data;
            //mettre ?? jour le tableau des url : 
            this.crud.changerPhoto(this.filmId, this.urlImage);
            this.modifAffiche=false;
          });
        })
      ).subscribe(()=>{//subscribe = indispensable pour r??cup??rer un observable !!
         //ensuire, apres upload, on vide le formulaire:
    
      });

        console.log('ok 112done');
    this.photo = {
      titre: this.filmId, file: ''
    };
  };
  ////////////////////////////////////////////       PUBLIER      /////////////////////////////////////////////
  messagePVis = false;
  messageP2Vis = false;
  publier1() {
    this.messagePVis = true;
  }
  publier2() {
    this.crud.publier(this.filmId);
    this.messagePVis = false;
    let mail3= {
      to: this.detail.email,
      subject: 'Publication de votre id??e',
      text : `Bonjour ${this.detail.auteur}, F??licitations, Votre projet a ??t?? illustr?? par M.La Mine et publi?? sur le site du Film Qui N'existe Pas. Rendez-vous sur https://lfqnep.web.app/films. Invitez vos amis ?? regarder et/ou participer via ce lien.`
    }
    this.msg.envoiMail(mail3).subscribe(()=>{
    this.nav();
    });
    
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
