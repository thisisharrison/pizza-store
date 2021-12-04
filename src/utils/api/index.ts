import axios, { AxiosResponse } from "axios";

axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export {};
