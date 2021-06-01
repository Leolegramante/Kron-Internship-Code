import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let faildRequestQue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)


  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextAuth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies(ctx)

        const { 'nextAuth.refreshToken': refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api.post('/refresh', {
            refreshToken
          }).then(response => {
            const { token } = response.data

            setCookie(ctx, 'nextAuth.token', token, {
              maxAge: 60 * 60 * 24 * 30, //30 days
              path: '/'
            })

            setCookie(ctx, 'nextAuth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30, //30 days
              path: '/'
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            faildRequestQue.forEach(request => request.onSuccess(token))
            faildRequestQue = []
          }).catch(err => {
            faildRequestQue.forEach(request => request.onfailure(err))
            faildRequestQue = []

            if (process.browser) {
              signOut()
            }
          }).finally(() => {
            isRefreshing = false
          })
        }

        return new Promise((resolve, reject) => {
          faildRequestQue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onfailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if (process.browser) {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError)
        }
      }
    }

    return Promise.reject(error)
  })

  return api
}