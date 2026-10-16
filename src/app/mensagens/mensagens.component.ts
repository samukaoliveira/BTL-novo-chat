import { ConversasService } from './../conversas/conversas.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Mensagem } from '../models/mensagem';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


  const USUARIO_ATUAL_ID = 1;

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss']
})
export class MensagensComponent implements OnInit, OnDestroy {

  usuarioId = 0;
  usuario?: Usuario;
  mensagens: Mensagem[] = [];
  novaMensagem = '';
  private routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private conversasService: ConversasService
  ) { }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.usuarioId = Number(params.get('usuarioId'));
      this.mensagens = [];
      this.carregar();
    })
  }

  carregar(): void {
    this.conversasService.carregarMensagens(this.usuarioId).subscribe({
      next: mensagens => {
        this.mensagens = mensagens || [];
        this.usuario = this.mensagens[0]?.conversa?.usuarios
          .find(usuario => usuario.id === this.usuarioId);
        if (!this.usuario) {
          this.conversasService.listarConversas().subscribe(usuarios => {
            this.usuario = usuarios.find(usuario => usuario.id === this
              .usuarioId);
          });
        }
      }
    })
  }

  enviar(): void {
    const conteudo = this.novaMensagem.trim();
    if (!conteudo) return;

    this.conversasService.enviar(conteudo, this.usuarioId).subscribe({
      next: mensagem => {
        this.mensagens = [...this.mensagens, mensagem];
        this.novaMensagem = '';
      },
      error: erro => console.error('Erro ao enviar mensagem', erro)
    })
  }

  formatarDataHora(dataHora: string): string {
    return this.conversasService.formatarHora(dataHora);
  }

  isMinhaMensagem(mensagem: Mensagem): boolean {
    return mensagem.senderId === USUARIO_ATUAL_ID;
  }

}
