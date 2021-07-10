import { AgendaEventos } from "./agendaEventos";

export interface AgendaTecnicos {
    tecnico:        string,
    identificacion: number,
    detalles:       AgendaEventos[]  
}
