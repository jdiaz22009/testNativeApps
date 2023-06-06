import { request } from "utils/request";

export interface IReservation {
  email: string;
  name: string;
  uidFlight: string;
  seatNumber: number;
}
export const createReservation = (params: IReservation) => {
  const body = {
    ...params,
    seatNumber: parseInt(params?.seatNumber.toString()),
  };
  const url = "http://localhost:3000/app/flight/reservation";
  return request("post", url, body);
};
