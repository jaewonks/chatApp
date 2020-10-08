import axios from 'axios'
import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER
} from './types'

export function loginUser(Submitteddata) {
    const request = axios.post('/api/users/signin', Submitteddata)
    //포스트 방식으로 요청을 보낸다.
        .then(response => response.data)
        return {
            type: LOGIN_USER,
            payload: request
        }
}

export function signUpUser(Submitteddata) {
    const request = axios.post('/api/users/signup', Submitteddata)
    //포스트 방식으로 요청을 보낸다.
        .then(response => response.data)
        return {
            type: SIGNUP_USER,
            payload: request
        }
}

export function auth() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data)
        return {
            type: AUTH_USER,
            payload: request
        }
}