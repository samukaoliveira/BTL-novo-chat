import { ConversasComponent } from './conversas/conversas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MensagensComponent } from './mensagens/mensagens.component';

const routes: Routes = [
  { path: 'conversas',
    component: ChatComponent },
  { path: 'mensagens',
  component: MensagensComponent },
  { path: '', redirectTo: 'conversas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
