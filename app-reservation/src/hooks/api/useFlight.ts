import useSWR from "swr";

import { fetcher } from "services/index";
export interface IFlight {
  uid: string;
  origin: string;
  destination: string;
  departureDate: Date;
  departuretime: string;
  capacity: number;
}
export const useFlight = () => {
  const { data, error, mutate } = useSWR<IFlight[]>(
    "http://localhost:3000/app/flight/",
    fetcher({ method: "get", isSecured: true })
  );

  return {
    data: data || [],
    loading: !data && !error,
    realod: mutate,
  };
};
