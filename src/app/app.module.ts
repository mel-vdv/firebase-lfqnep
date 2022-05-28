import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//firebase:
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//form:
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material:

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HomeComponent } from './components/home/home.component';
import { ProposerComponent } from './components/proposer/proposer.component';
import { ConcoursComponent } from './components/concours/concours.component';
import { OscarsComponent } from './components/oscars/oscars.component';
import { FilmsComponent } from './components/films/films.component';
import { DetailComponent } from './components/detail/detail.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditerComponent } from './components/editer/editer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProposerComponent,
    ConcoursComponent,
    OscarsComponent,
    FilmsComponent,
    DetailComponent,
    AdminComponent,
    EditerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),AngularFireAuthModule,  AngularFireStorageModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
