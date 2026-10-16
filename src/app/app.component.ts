import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'novo-chat';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logado(): boolean{
    return this.authService.logado();
  }

  //nomeUsuario(): string {
    //return this.authService.getNomeUsuario();
  //}
}
