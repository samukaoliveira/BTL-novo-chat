import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversasService {

  private readonly apiUrl = `${environment.apiUrl}/conversas`;

  constructor(private http: HttpClient) { }

  listarConversas(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiUrl}/listar`);
  }

  carregarMensagens(usuarioId: number): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(
      `${this.apiUrl}/usuario/${usuarioId}`
    );
  }

  enviar(conteudo: string, usuarioId: number): Observable<Mensagem> {
    return this.http.post<Mensagem>(
      `${this.apiUrl}/${usuarioId}/enviar`,
      { conteudo }
    );
  }

  formatarHora(valor: string): string {
    if (!valor) return '';

    const data = new Date(valor);
    if (isNaN(data.getTime())) {
      const [dataParte, horaParte = ''] = valor.split(' ');
      const [dia, mes, ano] = dataParte.split('/').map(Number);
      const [hora, minuto] = horaParte.split(':').map(Number);
      if (!dia || !mes || !ano) return valor;
      return `${dataParte}, ${String(hora || 0).padStart(2, '0')}:${String(minuto || 0).padStart(2, '0')}`;
    }

    const hoje = new Date();
    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);
    const hora = `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;

    if (data.toDateString() === hoje.toDateString()) return `hoje, ${hora}`;
    if (data.toDateString() === ontem.toDateString()) return `ontem, ${hora}`;
    return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}, ${hora}`;
  }

}
