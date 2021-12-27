import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/registration', {username, password, email, is_superuser: false})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchNoSuperusers = async () => {
    const {data} = await $authHost.get('api/user')
    return data
}

export const makeAdmin = async (email) => {
    const {data} = await $authHost.put('api/user', {email})
    return data
}

export const loginauth0 = async (username, email) => {
    const {data} = await $host.post('api/user/auth0', {username, email})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
