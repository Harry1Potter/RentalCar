import axios from "axios";
import { Car } from "@/types/car";

export const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

interface FetchCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: number;
  limit?: number;
}

interface CarsResponse {
  cars: Car[];
}

export const fetchCars = async (params: FetchCarsParams) => {
  const { data } = await api.get<CarsResponse>("/cars", {
    params,
  });

  return data.cars;
};

export const fetchBrands = async () => {
  const { data } = await api.get<string[]>("/brands");
  return data;
};