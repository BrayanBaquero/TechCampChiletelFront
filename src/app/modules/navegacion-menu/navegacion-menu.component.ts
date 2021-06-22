import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion-menu',
  templateUrl: './navegacion-menu.component.html',
  styleUrls: ['./navegacion-menu.component.css']
})
export class NavegacionMenuComponent implements OnInit {
  nombreUsuario:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private tokenService:TokenService,
              private router:Router
              ) {}

  ngOnInit(): void {
    this.nombreUsuario=this.tokenService.getUserName();
  }


  logOut():void{
    this.tokenService.logOut();
    this.router.navigate(['/']);

  }

}
