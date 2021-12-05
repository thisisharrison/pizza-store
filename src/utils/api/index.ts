import axios from "axios";
import apiUrl from "./apiConfig";
import type { Order } from "../../shared/types";

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

/** Creates an order or orders to backend services */
export const createOrder = (order: Order | Order[]): Promise<any> => axios.post(apiUrl + "api/orders", order);

/** Test if any services are available, do not call `createOrder` not services available */
export const testApi = () => axios.get(apiUrl + "api/orders/test");
