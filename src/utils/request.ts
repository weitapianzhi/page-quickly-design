import Axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios/index";

const request = Axios.create({
  baseURL: "/api"
}) 

request.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig=>{
  
  if(!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  }
  
  return config
})

request.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
  return response
})
export default request