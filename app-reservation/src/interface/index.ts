export interface ICardFlight {
  uid: string;
  origin: string;
  destination: string;
  departureDate: Date;
  departuretime: string;
  capacity: number;
  status: StatusFlight;
}

export enum StatusFlight {
  PENDING = "PENDING", // El vuelo está programado para una fecha futura y aún no ha despegado
  IN_PROGRESS = "IN_PROGRESS", // El vuelo está en curso y en proceso de despegue, vuelo o aterrizaje
  COMPLETED = "COMPLETED", // El vuelo ha llegado con éxito a su destino y ha finalizado.
  CANCELLED = "CANCELLED", // El vuelo ha sido cancelado antes o durante su ejecución
  DELAYED = "DELAYED", // El vuelo ha experimentado un retraso y se espera que salga o llegue más tarde de lo programado originalmente.
  DIVERTED = "DIVERTED", // El vuelo se ha desviado de su ruta original y se dirige a un destino alternativo.
  ON_THE_GROUND = "ON_THE_GROUND", // El vuelo ha aterrizado y está en tierra pero aún no se ha completado
}
