import { div, info, render, tag, hide, show, design, select, fa} from './apk.js';

export const bottomNav = () => {
  let home=div([fa('fa fa-home')])
  info(home,{
    classList:'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id:'home-btn'
  })
  home.addEventListener('click',function(){
    hide('#log')
    hide('#about')
    hide('#cart')
    show('#home')
    info(select('#vegTaza'),{
      innerText:'HOME'
    })
        let aud=new Audio('../pop.mp3')

            aud.play()
  })
  
  let cart=div([fa('fa fa-shopping-cart')])
  info(cart,{
    classList:'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id:'cart-btn'
  })
  cart.addEventListener('click', function() {
    hide('#log')
    hide('#about')
    hide('#home')
    show('#cart')
    info(select('#vegTaza'),{
      innerText:'CART'
    })
        let aud=new Audio('../pop.mp3')

    aud.play()
  })
  
  let account=div([fa('fa fa-user')])
  info(account, {
    classList:'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id:'ac-btn'
  })
  account.addEventListener('click',function(){
    hide('#home')
    hide('#about')
    hide('#cart')
    show('#log')
    info(select('#vegTaza'), {
      innerText: 'ACCOUNT'
    })
        let aud=new Audio('../pop.mp3')

    aud.play()
  })
  
  let about=div([fa('fa fa-info')])
  info(about, {
    classList:'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id:'about-btn'
  })
  about.addEventListener('click', function() {
    hide('#log')
    hide('#home')
    hide('#cart')
    show('#about')
    info(select('#vegTaza'), {
      innerText: 'ABOUT'
    })
        let aud=new Audio('../pop.mp3')

    aud.play()
  })
  
  let container = div([home, cart, account, about])
  info(container, {
    classList: 'flex py-1 text-green-400 font-bold justify-evenly shadow bg-white h-10 fixed w-full bottom-0'
  })
  
  render("#bottomNav", container)
}
