import axios from "axios";
import type { Order } from "../../shared/types";

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getCsrfToken = () => axios.get("http://localhost:8080/csrf");

export const createOrder = (order: Order | Order[]): Promise<any> => axios.post("http://localhost:8080/api/orders", order);
