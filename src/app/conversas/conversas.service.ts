import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Mensagem } from '../models/mensagem';

@Injectable({
  providedIn: 'root'
})
export class ConversasService {

  private readonly apiUrl = 'http://localhost:8080/conversas';

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

}
