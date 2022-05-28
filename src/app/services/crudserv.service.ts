import { Injectable } from '@angular/core';
import{ AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Film } from '../models/film';
import firebase from 'firebase/compat/app'; // important sous cette forme

@Injectable({
  providedIn: 'root'
})
export class CrudservService {
collek='films';
  constructor(
    private afs : AngularFirestore
  ) { }

  creerFilm(newFilm:Film){
   return this.afs.collection(this.collek).add(newFilm);
  }
 
  //-------------
  afficherDetail(id:any){
    return this.afs.doc(`${this.collek}/${id}`).valueChanges({idField:'id'}) as Observable<Film>;
  }
  //----------------
  getFilmsNoPubl(){
    return this.afs.collection('films', (ref)=>ref.where('published','==',false)).valueChanges({idField:'id'}) as Observable<Film[]>;
  }
  getFilmsPubl(){
    return this.afs.collection('films', (ref)=>ref.where('published','==',true)).valueChanges({idField:'id'}) as Observable<Film[]>;
  }
  //----------------/
  publier(id:any){
    return this.afs.collection(this.collek).doc(id).update({
      published: true
    }); 
  }
  //----------------
  editer(id:any, modif:any){
    return this.afs.collection(this.collek).doc(id).update(modif); 
  }
  //-----------------
  supprimer(id:any){
    return this.afs.collection(this.collek).doc(id).delete();
  }
  //--------------------------
  voter(id:any, etoiles:number){
  const increment = firebase.firestore.FieldValue.increment(1);
  const somme =  firebase.firestore.FieldValue.increment(etoiles);

  return this.afs.collection(this.collek).doc(id).update({
    nbVotesPublic: increment,
    nbStarsPublic: somme
  }); 
}
//-------------------------
changerPhoto(id:any, url:any){
  return this.afs.collection('films').doc(id).update({
    url:[firebase.firestore.FieldValue.arrayUnion(url)]
  });
}
}
