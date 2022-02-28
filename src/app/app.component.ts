import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-lfqnep';

  constructor(
    private router: Router
  ){

  }

  nav(loc:any){
    this.router.navigate([`/${loc}`]);
  }

}
