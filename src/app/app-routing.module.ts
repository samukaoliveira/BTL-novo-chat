import { ConversasComponent } from './conversas/conversas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'conversas',
    component: ChatComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'mensagens/:usuarioId', component: MensagensComponent }
    ]
  },
  { path: 'mensagens',
  component: MensagensComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
