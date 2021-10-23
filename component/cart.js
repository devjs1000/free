import { div, info, render, tag, design, fa, hide, show, select, timeoutHide } from './apk.js';
import { getCart, ready, removeArray, updateArray, dataBase } from './fire.js';
var myId;
var orderId;
var loc = ''
var currentWindow = 'cart'
var stateChecker = {
  pending: 'blue',
  accepted: 'green',
  rejected: 'red'
}

const orderIdMaker = () => {
  var r1 = Math.random() * 100000
  var r2 = Math.random() * 100000
  var r3 = Math.random() * 100000
  var r4 = Math.floor(r1+r2+r3)
  var r5 = new Date().getTime()
  var r6 = 'OR'+(r4+r5)
  return r6
}
const addressCheck = (adr) => {
  if (adr == 'E-7/328' || adr == null) {
    return false
  }
  if (adr == '' || adr == undefined) {
    return false
  }
  return true
}
export const finalProduct = (src, name, price, quantity) => {
  let productImg = tag('img')
  info(productImg, {
    classList: 'productImg md:h-40 h-auto w-40 ',
    src: src
  })

  let productName = div(name)
  info(productName, {
    classList: 'p-1 productName bg-green-800 text-white w-full text-center'
  })

  let productPrice = div(price)
  info(productPrice, {
    classList: 'p-1 productPrice bg-green-800 text-white w-full text-center'
  })

  let productQuantity = div(quantity)
  info(productQuantity, {
    classList: 'p-1 productQuantity w-full outline-none text-white bg-gray-800'
  })

  let showCase = div([productName, productPrice, productQuantity])
  info(showCase, {
    classList: 'flex w-full md:w-80 justify-evenly'
  })
  let a1 = div('delete ')
  let removeCart = div([a1, fa('fa fa-trash')])
  info(removeCart, {
    classList: 'p-1 md:w-80 text-center flex justify-center items-center bg-green-600 text-white w-full'
  })

  removeCart.addEventListener('click', function(e) {
    let p1 = productName
    let p2 = productImg
    let p3 = productPrice
    let p4 = productQuantity
    let p5 = {
      name: p1.innerText,
      img: p2.src,
      price: p3.innerText,
      quantity: p4.innerText
    }
    let aud = new Audio('../pop.mp3')
    aud.play()

    removeArray(myId, 'cart', p5, () => {
      let m1 = e.target.parentElement
      let m2 = m1.classList
      let m3 = m1.parentElement
      let m4 = m3.classList

      if (checkClass(m2, 'myProduct')) {
        m1.remove()
      }

      if (checkClass(m4, 'myProduct')) {
        m3.remove()
      }

      function checkClass(xx, yy) {
        let pos = false
        for (let k of xx) {
          if (k == yy) {
            pos = true
          }
        }
        return pos
      }
    })
  })

  let product = div([productImg, showCase, removeCart])
  info(product, {
    classList: 'shadow my-2 h-80 w-full md:w-80 myProduct'
  })
  return product
}

const billingProduct = (name, price, quantity) => {
  let productName = div(name)
  info(productName, {
    classList: 'bg-gray-800 mx-2 rounded-full w-full'
  })
  let productPrice = div(price)
  info(productPrice, {
    classList: 'bg-gray-800 mx-2 rounded-full  w-full'
  })
  let productQuantity = div(quantity)
  info(productQuantity, {
    classList: 'bg-gray-800 mx-2 rounded-full w-full'
  })

  let showCase = div([productName, productQuantity, productPrice])
  info(showCase, {
    classList: 'flex justify-evenly text-center rounded text-white w-full shadow font-bold py-4 p-2'
  })

  return showCase
}

const addressForm = () => {
  let title = tag('h2')
  info(title, {
    innerText: 'delivery address',
    classList: 'text-2xl px-5 text-white bg-gray-800'
  })
  let address = tag('textarea')
  info(address, {
    id: 'myAddress',
    value: 'E-7/328',
    classList: 'bg-white shadow outline-none p-5 w-full h-20'
  })

  let locationBtn = div(['current location ', fa('fa fa-map-marker')])
  info(locationBtn, {
    classList: 'w-full shadow text-xl text-center text-white bg-gray-800'
  })
  locationBtn.addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude
      let lon = pos.coords.longitude
      loc = 'https://maps.google.com/maps?q=' + lat + ',' + lon
      let aud = new Audio('../pop.mp3')
      aud.play()
    })
  })

  let cod = div('cash on delivery')
  info(cod, {
    classList: 'w-full text-2xl text-gray-800 shadow font-bold h-40 w-full',
    src: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202110/e7-sixteen_nine.jpg?size=948:533'
  })
  design(cod,{
    backgroundImage:'url(https://akm-img-a-in.tosshub.com/businesstoday/images/story/202110/e7-sixteen_nine.jpg?size=948:533)',
    backgroundSize:'100%'
  })
  let container = div([title, address, locationBtn, cod])
  info(container, {
    id: 'address-form',
    classList: 'hidden flex flex-wrap'
  })
  return container
}

const productOrder = (oid, date, time, item, state) => {
  let productId = div(oid)
  info(productId, {
    classList: 'p-2 font-bold w-full md:w-auto'
  })
  let productDate = div(date)
  info(productDate, {
    classList: 'p-2 font-bold w-full md:w-auto'
  })

  let productTime = div(time)
  info(productTime, {
    classList: 'p-2 font-bold w-full md:w-auto'
  })

  let dt = div([productDate, productTime])
  info(dt, {
    classList: 'rounded text-gray-800 bg-white w-full flex justify-evenly'
  })
  let productStatus = div(state)
  info(productStatus, {
    classList: 'p-2 font-bold w-full md:w-auto'
  })
  let colo = stateChecker[state] || 'white'

  let itemDetail = tag('details')
  info(itemDetail, {
    classList: 'w-full decoration-none overflow-hidden text-white bg-gray-800 rounded'
  })

  let itemSummary = tag('summary')
  info(itemSummary, {
    innerText: 'products',
    classList: 'font-bold mx-1 bg-white rounded text-xl my-1 text-gray-800'
  })
  itemSummary.addEventListener('click',function(){
  let aud = new Audio('../pop.mp3')
  aud.play()
  })

  itemDetail.append(itemSummary)
  let fullItem = []
  for (let i = 0; i < item.length; i++) {
    fullItem.push(billingProduct(item[i].name, item[i].price, item[i].quantity))
  }

  let sum = div([...fullItem])
  info(sum, {
    classList: 'mx-1 rounded bg-white my-2 '
  })
  itemDetail.append(sum)
  let myOrder = div([productId, itemDetail, dt, productStatus])
  info(myOrder, {
    classList: 'flex my-1 text-white flex-wrap justify-center items-center shadow p-1 bg-' + colo + '-400'
  })
  return myOrder
}



export const cart = () => {
  let products = []
  let ordersMine = []
  ready((user) => {
    myId = user.uid
    getCart(user.uid, (data) => {
      let len = data.cart.length
      for (let i = 0; i < len; i++) {
        products.push(finalProduct(data.cart[i].img, data.cart[i].name, data.cart[i].price, data.cart[i].quantity))
      }
      for (let i = 0; i < data.orderHistory.length; i++) {
        let oh = data.orderHistory[i]
        ordersMine.push(productOrder(oh.orderId, oh.date, oh.time, oh.items, oh.status))
        
      }
ordersMine.reverse()
products.reverse()
      let container = div([...products,tag('br'),tag('br')])
      info(container, {
        id: 'carty-container',
        classList:'flex flex-wrap'
      })


      let billing = div('')
      info(billing, {
        id: 'billing'
      })
      design(billing, {
        display: 'none'
      })

      let checkOut = div([div('check out cart '), fa('fa fa-angle-double-right')])
      info(checkOut, {
        id: 'check-out',
        classList: 'shadow fixed bottom-10 grid gap-5 grid-flow-col place-content-center place-items-center w-full bg-green-700 font-bold text-white pl-5 p-1 hover:bg-green-600'
      })

      let placeOrder1 = div([div('place order')])
      info(placeOrder1, {
        id: 'place-order-1',
        classList: 'text-center shadow hidden fixed bottom-10 grid gap-5 grid-flow-col place-content-center place-items-center w-full bg-green-700 font-bold text-white pl-5 p-1 hover:bg-green-600'
      })

      let placeOrder2 = div([div('place order')])
      info(placeOrder2, {
        id: 'place-order-2',
        classList: 'text-center hidden shadow fixed bottom-10 grid gap-5 grid-flow-col place-content-center place-items-center w-full bg-green-700 font-bold text-white pl-5 p-1 hover:bg-green-600'
      })

      placeOrder2.addEventListener('click', function() {
        //push order on server
        let adrs = select('#myAddress').value
        console.log(adrs)
        dataBase('users', myId, (data) => {
          if (data.cart.length != 0) {
            if (addressCheck(adrs)) {
              let cc1 = data.cart
              let dd = new Date()
              let fd = {
                phone: data.phone,
                address: adrs,
                location: loc,
                uid: myId,
                orderId: orderId,
                date: dd.toLocaleDateString(),
                time: dd.toLocaleTimeString(),
                items: cc1,
                status: 'pending'
              }
              console.log(fd)
              updateArray('orderHistory', fd, function() {
                design(select('#alert'), {
                  display: 'block'
                })
                timeoutHide('#alert', 2000)
                info(select('#alertMsg'), {
                  innerText: 'order success!'
                })
                
                 let ddo=productOrder(fd.orderId, fd.date, fd.time, fd.items, fd.status)
                 select('#order-area').prepend(ddo)
                
                let aud = new Audio('../pop.mp3')
                aud.play()
                for (let k = 0; k < cc1.length; k++) {
                  removeArray(myId, 'cart', cc1[k], function() {
                    if (k == cc1.length - 1) {
                      info(select('#carty-container'), {
                        innerHTML: ''
                      })
                    }
                  })
                }
                aud.play()
              })
            }
          }
        })

      })


      placeOrder1.addEventListener('click', function(e) {
        currentWindow = 'form'
        hide('#check-out')
        hide('#carty-container')
        hide('#billing')
        hide('#place-order-1')
        show('#address-form')
        show('#place-order-2')
        let aud = new Audio('../pop.mp3')
        aud.play()
      })

      checkOut.addEventListener('click', function(e) {


        getCart(myId, (data) => {
          if (data.cart.length != 0) {
            let aud = new Audio('../pop.mp3')
            aud.play()
            info(select('#billing'), {
              innerHTML: ''
            })

            currentWindow = 'billing'
            hide('#check-out')
            hide('#carty-container')
            show('#billing')
            show('#place-order-1')

            let p1 = data.cart
            for (let i = 0; i < p1.length; i++) {
              let d1 = p1[i]
              let p2 = billingProduct(d1.name, d1.price, d1.quantity)
              select('#billing').append(p2)
            }
            orderId = orderIdMaker()
            let oid = div([orderId])
            info(oid, {
              classList: 'select-all overflow-scroll w-full'
            })
            let t1 = tag('b')
            info(t1, {
              innerText: 'orderId:',
              classList: 'bg-gray-800 px-2 rounded-l-full text-white'
            })
            let c1 = div([t1, oid])
            info(c1, {
              classList: 'flex shadow my-2 mx-4 rounded-full'
            })
            billing.append(div([c1]))
          } else {
            design(select('#alert'), {
              display: 'block'
            })
            timeoutHide('#alert', 3000)
            info(select('#alertMsg'), {
              innerText: 'your cart is empty'
            })
            let aud = new Audio('../pop.mp3')
            aud.play()
          }
        })

      })
      let back = div([fa('fa fa-chevron-circle-left')])
      info(back, {
        classList: 'text-3xl'
      })
      back.addEventListener('click', function() {
        if (currentWindow == 'billing') {
          hide('#billing')
          currentWindow = 'cart'
          design(checkOut, {
            display: 'flex'
          })
          hide('#place-order-1')
          design(select('#carty-container'), {
          display: 'flex'
        })
          hide('#order-area')
        }
        if (currentWindow == 'form') {
          currentWindow = 'billing'
          show('#billing')
          hide('#address-form')
          hide('#place-order-2')
          show('#place-order-1')
          hide('#order-area')
        }
        let aud = new Audio('../pop.mp3')
        aud.play()
      })

      let cartToggle = div('your cart')
      info(cartToggle, {
        classList: 'hover:bg-gray-800 hover:text-white rounded-full px-3 '
      })
      cartToggle.addEventListener('click', function() {
        hide('#billing')
        currentWindow = 'cart'
        design(checkOut, {
          display: 'flex'
        })
        hide('#place-order-1')
        design(select('#carty-container'), {
          display: 'flex'
        })
        hide('#place-order-2')
        hide('#address-form')
        hide('#order-area')
        let aud = new Audio('../pop.mp3')
        aud.play()
      })
      let orderToggle = div('your orders')
      info(orderToggle, {
        classList: 'hover:bg-gray-800 hover:text-white rounded-full px-3'
      })
      orderToggle.addEventListener('click', function() {
        hide('#billing')
        currentWindow = 'orders'
        hide('#check-out')
        hide('#place-order-1')
        hide('#carty-container')
        hide('#place-order-2')
        hide('#address-form')
        show('#order-area')
        let aud = new Audio('../pop.mp3')
        aud.play()
      })

      let cartPanel = div([back, cartToggle, orderToggle])
      info(cartPanel, {
        classList: 'flex items-center justify-evenly p-2 shadow font-bold'
      })
      let orderArea = div([...ordersMine])
      info(orderArea, {
        id: 'order-area',
        classList: 'hidden'
      })
      render('#cart', cartPanel)
      render('#cart', orderArea)
      render('#cart', container)
      render('#cart', billing)
      render('#cart', addressForm())
      render('#cart', checkOut)
      render('#cart', placeOrder1)
      render('#cart', placeOrder2)
    })

  })
}
