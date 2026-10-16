import { ConversasComponent } from './conversas/conversas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MensagensComponent } from './mensagens/mensagens.component';

const routes: Routes = [
  { path: 'conversas',
    component: ChatComponent,
    children: [
      { path: 'mensagens/:usuarioId', component: MensagensComponent }
    ]
  },
  { path: 'mensagens',
  component: MensagensComponent },
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
