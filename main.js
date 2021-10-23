import { div, info, render, tag, hide, show, design, select } from 'component/apk.js'
import {log} from 'component/log.js'
import {nav} from 'component/nav.js'
import {bottomNav} from 'component/bottomNav.js'
import {home} from 'component/home.js'
import {cart} from 'component/cart.js'

hide('#log')
hide('#about')
hide('#cart')
show('#home')

nav()
home()
cart()
log()
bottomNav()

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => 0).catch(er => 0)
  })
}

navigator.geolocation.getCurrentPosition(()=>{})
