import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { ConversasService } from './conversas.service';

@Component({
  selector: 'app-conversas',
  templateUrl: './conversas.component.html',
  styleUrls: ['./conversas.component.scss']
})
export class ConversasComponent implements OnInit {

  usuarios: Usuario[] = [];
  busca: string = '';
  carregando = true;
  erro = '';

  constructor(private conversaService: ConversasService) { }

  ngOnInit(): void {
    this.conversaService.listarConversas().subscribe({
      next: usuarios => {
        this.usuarios = usuarios || [];
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possivel carregas os contatos.';
        this.carregando = false;
      }
    });
  }

  get usuariosFIltrados(): Usuario[] {
    const termo = this.busca.trim().toLocaleLowerCase();
    return this.usuarios.filter(usuario =>
      usuario.nome.toLocaleLowerCase().includes(termo)
    );
  }

}
