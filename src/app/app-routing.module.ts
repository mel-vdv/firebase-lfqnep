import { EditerComponent } from './components/editer/editer.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConcoursComponent } from './components/concours/concours.component';
import { OscarsComponent } from './components/oscars/oscars.component';
import { DetailComponent } from './components/detail/detail.component';
import { FilmsComponent } from './components/films/films.component';
import { ProposerComponent } from './components/proposer/proposer.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'proposer', component:ProposerComponent},
  {path:'films', component:FilmsComponent},
  {path:'detail/:id', component:DetailComponent},
  {path: 'editer/:id', component: EditerComponent},
  {path:'oscars', component:OscarsComponent},
  {path:'concours', component:ConcoursComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
