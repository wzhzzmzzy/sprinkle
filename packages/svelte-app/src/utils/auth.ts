import Cookie from "js-cookie";
import {navigate} from "svelte-routing";
import {toggleUserAuthChecking} from "../store/page-status";

export function updateToken(token) {
  return 'early-test'
}

const fetchLogin = (token: string) => {
  toggleUserAuthChecking(true)
  return new Promise<void>(resolve => {
    setTimeout(() => {
      Cookie.set('meow-bot-token', updateToken(token), { expires: 1, path: '' })
      toggleUserAuthChecking(false)
      resolve()
    }, 1000)
  })
}

export const triggerLogin = () => {
  const userToken = Cookie.get('meow-bot-token')

  fetchLogin(userToken).then(() => {
    if (window.location.pathname === '/login') {
      navigate('/')
    }
  }).catch(() => {
    if (window.location.pathname !== '/login') {
      navigate('/login')
    }
  })
}
