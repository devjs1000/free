import { div, info, render, tag, design, select, fa } from './apk.js';
import { dataBase, updateArray, removeArray } from './fire.js';
import { finalProduct as prd } from './cart.js';
let aud = new Audio('../pop.mp3')
const eventSearch = new Event('searchy');

let products = []
export const finalProduct = (src, name, price) => {
    let productImg = tag('img')
    info(productImg, {
      classList: 'productImg h-40  ',
      src: src
    })
    let productName = div(name)
    info(productName, {
      classList: 'p-1 productName  w-full text-center'
    })
    let productPrice = div(price + ' rs')
    info(productPrice, {
      classList: 'p-1 productPrice w-full text-center'
    })
    let productQuantity = tag('select')
    info(productQuantity, {
      classList: 'p-1 productQuantity w-full outline-none text-white bg-gray-800'
    })
    productQuantity.addEventListener('change', () => {
      let p1 = productQuantity.value
      let p2 = p1.split('kg')[0]
      let p3 = parseInt(p2)
      info(productPrice, {
        innerText: `${price*p3}rs`,
        classList: 'p-1'
      })
    })
    let weights = ['1kg', '2kg', '3kg', '4kg', '5kg','6kg','7kg','8kg','9kg','10kg','12kg', '14kg', '16kg', '18kg','20kg']
    for (let i = 0; i < weights.length; i++) {
      let weight = tag('option')
      info(weight, {
        innerText: weights[i]
      })
      productQuantity.append(weight)
    }
    let showCase = div([productName, productPrice, productQuantity])
    info(showCase, {
      classList: 'flex text-gray-100 shadow mt-2 bg-green-800 w-full md:w-80 justify-evenly'
    })
    let a1 = div('add to cart ')
    let addToCart = div([a1, fa('fa fa-shopping-cart')])
    info(addToCart, {
      classList: 'py-1 md:w-80 text-center bg-green-600 text-white w-full flex justify-center items-center'
    })
    addToCart.addEventListener('click', () => {
      let p1 = productName
      let p2 = productImg
      let p3 = productPrice
      let p4 = productQuantity
      let p5 = {
        name: p1.innerText,
        img: p2.src,
        price: p3.innerText,
        quantity: p4.value
      }
      updateArray('cart', p5, function() {
        var last = prd(p5.img, p5.name, p5.price, p5.quantity)
        select('#carty-container').prepend(last)
        info(a1,{
          innerText:'added'
        })
        aud.play()
      })
      
    })

    let product = div([productImg, showCase, addToCart])
    info(product, {
      classList: 'shadow my-5 w-full md:w-80'
    })
    return product
  }

export const home = () => {
  let swiperWrapper = tag('div')
  info(swiperWrapper, {
    id: 'sWrapper',
    classList: 'swiper-wrapper '
  })

  let slide = div([swiperWrapper])
  info(slide, {
    id:'slide-container',
    classList: 'swiper mySwiper  whitespace-nowrap overflow-scroll shadow'
  })

  


  dataBase('veggies', 'list', (data) => {
    let len = data.arr.length
    for (let i = 0; i < len; i++) {
      products.push(finalProduct(data.arr[i].img, data.arr[i].name, data.arr[i].price))
      let im = tag('img')
      info(im, {
        alt:data.arr[i].name,
        src: data.arr[i].img,
        classList: 'inline-block h-40'
      })
      let cont = div([im])
      info(cont, {
        classList: 'swiper-slide'
      })
      cont.addEventListener('click', function(){
        //affect search
        info(select('#search'),{
          value:im.alt
        })
            search.dispatchEvent(eventSearch)
      })
      swiperWrapper.append(cont)
      //console.log(slide)
    }
    let container = div([...products])
    info(container, {
      id: 'cart-container',
      classList:'flex flex-wrap'
    })
    render('#home', slide)
    render('#home', container)

    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      }
    });
  })
}
