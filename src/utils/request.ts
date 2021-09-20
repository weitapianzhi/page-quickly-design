import Axios from "axios";

const request = Axios.create({
  baseURL: "/api"
}) 

request.interceptors.request.use((config)=>{
  
  if(!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  }
  
  return config
})

request.interceptors.response.use((response) => {
  return response
})
export default request