import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor(
    private http: HttpClient
  ) { }

  envoiMail(mail:any){
    console.log('service : envoiMail()');
   return this.http.post('http://localhost:3000/sendmail', mail);
  }
}
