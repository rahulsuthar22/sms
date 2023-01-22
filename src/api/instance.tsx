import Axios from "axios";
export const instance = Axios.create({
  baseURL: "http://192.168.43.28:5000/api",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
