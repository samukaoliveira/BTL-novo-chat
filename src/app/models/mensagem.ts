import { Conversa } from "./conversa";

export interface Mensagem {
  id: number;
  conteudo: string;
  conversa?: Conversa;
  horaEnvio: string;
  senderId: number;
}
