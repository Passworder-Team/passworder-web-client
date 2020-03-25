import axios from 'axios'

const passworderApi = axios.create({
  baseURL: "https://api-passworder.nafies.tech"
})

export default passworderApi