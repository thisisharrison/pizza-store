import axios from "axios";
import apiUrl from "./apiConfig";
import type { Order } from "../../shared/types";

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const createOrder = (order: Order | Order[]): Promise<any> => axios.post(apiUrl + "/api/orders", order);
