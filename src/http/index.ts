import { baseURL } from "../utils/config"
import axios from "axios"

export const $api = axios.create({
    withCredentials: true,
    baseURL: `${baseURL}/api`,
})