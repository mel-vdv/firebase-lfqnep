import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-proposer',
  templateUrl: './proposer.component.html',
  styleUrls: ['./proposer.component.css']
})
export class ProposerComponent implements OnInit {

  filmForm: FormGroup;
  constructor(
    private fb : FormBuilder,
    private crud: CrudservService
  ) { 
    this.filmForm = this.fb.group({
      "auteur":['',Validators.required],
      "email":['',Validators.email],
      "titre":['',Validators.required],
      "accroche": ['',Validators.required],
      "genre":['',Validators.required],
      "pitch":['',Validators.required],
      "note":['',Validators.required],
      "casting":['',Validators.required],
    })
  }

  ngOnInit(): void {
  }


  async proposer(){
    this.filmForm.value.published=false;
    this.filmForm.value.nbStarsPublic=0;
    this.filmForm.value.nbVotesPublic=0;
    this.filmForm.value.nbStarsAdmin=0;
    this.filmForm.value.nbVotesAdlin=0;
    await this.crud.creerFilm(this.filmForm.value);
    this.filmForm.reset();
  }

}
