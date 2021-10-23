import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, updateProfile, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtoeJC8Pc0b7XO4KSxGONEL3fyxhqXXxQ",
  authDomain: "vegtaza-68667.firebaseapp.com",
  projectId: "vegtaza-68667",
  storageBucket: "vegtaza-68667.appspot.com",
  messagingSenderId: "446430771457",
  appId: "1:446430771457:web:d12be61b172fb757d14300",
  measurementId: "G-9SM7K9GJVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

function stater() {
  setPersistence(auth, browserLocalPersistence).then(() => {})
}
stater()

function registerFn(email, password, name, phone) {
  createUserWithEmailAndPassword(auth, email.value, password.value).then((cred) => {
    updateProfile(auth.currentUser, {
      displayName: name.value
    })
    setDoc(doc(db, "users", cred.user.uid), {
      'email': cred.user.email,
      'id': cred.user.uid,
      'phone': phone.value,
      'name': name.value,
      'cart': [],
      'orderHistory': [],
      'address': '',
      'location': ''
    });
    setDoc(doc(db, "admin", cred.user.email), {
      'id': cred.user.uid
    }).then(() => {
      window.location.reload()
    })
  })
}

function loginFn(email, password) {
  signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => { window.location.reload() }).catch((err) => {

    design(select('#alert'), {
      display: 'block'
    })
    timeoutHide('#alert', 3000)
    info(select('#alertMsg'), {
      innerText: err.message
    })
    let au = new Audio('../pop.mp3')
    au.play()
  })
}

async function dataBase(gate1, gate2, func) {
  const docRef = doc(db, gate1, gate2);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    func(docSnap.data())
  }
}

async function updateArray(gate1, data1, func) {
  try {
    const ref = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(ref, {
    [gate1]: arrayUnion(data1)
    });
    func()
  } catch (err) {
    console.log(err)
    design(select('#alert'), {
      display: 'block'
    })
    timeoutHide('#alert', 3000)
    info(select('#alertMsg'), {
      innerText: 'please login first'
    })
    let au = new Audio('../pop.mp3')
    au.play()
  }

}

function ready(func) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      func(user)
    }
  });
}

async function getCart(authId, func1) {
  const docRef = doc(db, 'users', authId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    func1(docSnap.data())
  }
}

async function removeArray(authId, gate1, data1, func) {
  const ref = await doc(db, "users", authId);
  updateDoc(ref, {
      [gate1]: arrayRemove(data1)
  });
  func()
}




const tag = xx => document.createElement(xx)
const render = (xx, yy) => {
  document.querySelector(xx).append(yy)
}

const div = xx => {
  let e1 = tag('div')
  if (typeof xx != 'object') {
    e1.append(xx)
  }
  if (typeof xx == 'object') {
    for (let i in xx) {
      e1.append(xx[i])
    }
  }
  return e1
}

const design = (xx, yy) => {
  let p1 = Object.keys(yy)
  for (let i in p1) {
    xx.style[p1[i]] = yy[p1[i]]
  }
}

const select = xx => document.querySelector(xx)
const selectAll = xx => document.querySelectorAll(xx)
const id = xx => document.getElementById(xx)

const info = (xx, yy) => {
  let p1 = Object.keys(yy)
  for (let i in p1) {
    xx[p1[i]] = yy[p1[i]]
  }
}

const hide = (xx) => {
  design(select(xx), {
    display: 'none'
  })
}
const show = (xx) => {
  design(select(xx), {
    display: 'block'
  })
}

const fa = (xx) => {
  let t1 = tag('i')
  t1.classList = xx
  return t1
}

const timeoutHide = (el, tm) => {
  setTimeout(() => { hide(el) }, tm)
}

//bottomNavjs-----------
const bottomNav = () => {
  let home = div([fa('fa fa-home')])
  info(home, {
    classList: 'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id: 'home-btn'
  })
  home.addEventListener('click', function() {
    hide('#log')
    hide('#about')
    hide('#cart')
    show('#home')
    info(select('#vegTaza'), {
      innerText: 'HOME'
    })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let cart = div([fa('fa fa-shopping-cart')])
  info(cart, {
    classList: 'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id: 'cart-btn'
  })
  cart.addEventListener('click', function() {
    hide('#log')
    hide('#about')
    hide('#home')
    show('#cart')
    info(select('#vegTaza'), {
      innerText: 'CART'
    })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let account = div([fa('fa fa-user')])
  info(account, {
    classList: 'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id: 'ac-btn'
  })
  account.addEventListener('click', function() {
    hide('#home')
    hide('#about')
    hide('#cart')
    show('#log')
    info(select('#vegTaza'), {
      innerText: 'ACCOUNT'
    })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let about = div([fa('fa fa-info')])
  info(about, {
    classList: 'hround hover:bg-green-400 hover:shadow hover:text-white text-center w-full',
    id: 'about-btn'
  })
  about.addEventListener('click', function() {
    hide('#log')
    hide('#home')
    hide('#cart')
    show('#about')
    info(select('#vegTaza'), {
      innerText: 'ABOUT'
    })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let container = div([home, cart, account, about])
  info(container, {
    classList: 'flex py-1 text-green-400 font-bold justify-evenly shadow bg-white h-10 fixed w-full bottom-0'
  })

  render("#bottomNav", container)
}

//cart-----------
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
  var r4 = Math.floor(r1 + r2 + r3)
  var r5 = new Date().getTime()
  var r6 = 'OR' + (r4 + r5)
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
const finalProduct1 = (src, name, price, quantity) => {
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
  design(cod, {
    backgroundImage: 'url(https://akm-img-a-in.tosshub.com/businesstoday/images/story/202110/e7-sixteen_nine.jpg?size=948:533)',
    backgroundSize: '100%'
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
  itemSummary.addEventListener('click', function() {
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



const cart = () => {
  let products = []
  let ordersMine = []
  ready((user) => {
    myId = user.uid
    getCart(user.uid, (data) => {
      let len = data.cart.length
      for (let i = 0; i < len; i++) {
        products.push(finalProduct1(data.cart[i].img, data.cart[i].name, data.cart[i].price, data.cart[i].quantity))
      }
      for (let i = 0; i < data.orderHistory.length; i++) {
        let oh = data.orderHistory[i]
        ordersMine.push(productOrder(oh.orderId, oh.date, oh.time, oh.items, oh.status))

      }
      ordersMine.reverse()
      products.reverse()
      let container = div([...products, tag('br'), tag('br')])
      info(container, {
        id: 'carty-container',
        classList: 'flex flex-wrap'
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
              updateArray('orderHistory', fd, function() {
                design(select('#alert'), {
                  display: 'block'
                })
                timeoutHide('#alert', 2000)
                info(select('#alertMsg'), {
                  innerText: 'order success!'
                })

                let ddo = productOrder(fd.orderId, fd.date, fd.time, fd.items, fd.status)
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

///log------

function checkPhone(num) {
  num = num.trim()
  if (num.length < 15 && num.length > 9) {
    if (num.length == 10) {
      if (!isNaN(num)) {
        return true
      }
    }
    if (num[0] == '+') {
      if (num.indexOf(' ') != -1) {
        if (num.split(' ')[1].length == 10 && !isNaN(num.split(' ')[1])) {
          return true
        }
      }
      if (num.indexOf(' ') == -1) {
        if (num.split('+')[1].length == 12 && !isNaN(num.split('+')[1])) {
          return true
        }
      }

    }
    if (num.length == 12) {
      if (!isNaN(num)) {
        return true
      }
    }
    if (num.length == 11 && num[0] == 0) {
      if (!isNaN(num)) {
        return true
      }
    }
    if (num.indexOf(' ') != -1) {
      if (num.split(' ')[1].length == 10 && !isNaN(num.split(' ')[1])) {
        return true
      }
    }
  }

  design(select('#alert'), {
    display: 'block'
  })
  timeoutHide('#alert', 3000)
  info(select('#alertMsg'), {
    innerText: 'phone number is not valid'
  })
  let aud = new Audio('../pop.mp3')
  aud.play()
  return false
}

const profile = (nm, ph, em) => {
  let name = div(nm)
  let n = div('name')
  let c1 = div([n, name])
  info(n, {
    classList: 'w-20 font-bold'
  })
  info(c1, {
    classList: 'bg-green-800 mt-1 flex w-full text-white'
  })

  info(name, {
    classList: 'pl-3 bg-white hover:bg-gray-100 w-full md:w-60 text-left text-gray-800'
  })

  let phone = div(ph)
  let p = div('phone')
  let c2 = div([p, phone])
  info(p, {
    classList: 'w-20 font-bold'
  })
  info(c2, {
    classList: 'bg-green-800 mt-1 flex w-full text-white'
  })
  info(phone, {
    classList: 'pl-3 hover:bg-gray-100 bg-white w-full md:w-60  hover:bg-white text-left text-gray-800'
  })

  let email = div(em)
  let e = div('email')
  let c3 = div([e, email])
  info(e, {
    classList: 'w-20 font-bold'
  })
  info(c3, {
    classList: 'bg-green-800 mt-1 flex w-full text-white'
  })
  info(email, {
    classList: 'pl-3 bg-white text-left hover:bg-gray-100 md:w-60 w-full text-gray-800'
  })

  let container = div([c1, c2, c3])
  info(container, {
    id: 'profile',
    classList: 'shadow flex flex-wrap'
  })
  return container
}

const log = () => {
  let name = tag('input')
  info(name, {
    type: 'text',
    id: 'name',
    placeholder: 'name',
    classList: 'bg-gray-100 mx-2 px-2 block w-full md:w-1/2 my-1 outline-none'
  })

  let em = tag('input')
  info(em, {
    type: 'email',
    id: 'email',
    placeholder: 'email',
    classList: 'bg-gray-100 mx-2 px-2 block my-1 w-full md:w-1/2 outline-none'
  })

  let phone = tag('input')
  info(phone, {
    type: 'number',
    id: 'phone',
    placeholder: 'phone',
    classList: 'bg-gray-100 px-2 mx-2 block my-1 w-full md:w-80 outline-none'
  })

  let pas = tag('input')
  info(pas, {
    type: 'password',
    id: 'password',
    placeholder: 'password',
    classList: 'bg-gray-100 mx-2 px-2 block w-full md:w-80 my-1 outline-none'
  })

  let a1 = div('login ')
  let a2 = div([a1, fa('fa fa-sign-in')])
  info(a2, {
    classList: 'flex justify-center items-center'
  })
  let login = div([a2])
  info(login, {
    classList: 'bg-green-500 p-1 flex my-1 w-full md:w-60 text-green-50'
  })
  design(login, {
    display: 'none'
  })
  login.addEventListener('click', () => {
    loginFn(em, pas)
    let aud = new Audio('../pop.mp3')
    aud.play()
  })

  let a3 = div('create new account ')
  let a4 = div([a3, fa('fa fa-user-plus')])
  info(a4, {
    classList: 'flex justify-center items-center'
  })
  let newAccount = div([a4])
  info(newAccount, {
    classList: 'md:w-60 bg-green-500 p-1 my-1 block w-full text-green-50'
  })
  newAccount.addEventListener('click', () => {
    if (checkPhone(phone.value)) {
      registerFn(em, pas, name, phone)
    }
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let loginShow = div('login')
  info(loginShow, {
    classList: 'text-center w-full bg-white shadow text-green-500'
  })
  loginShow.addEventListener('click', () => {
    design(newAccount, { display: 'none' })
    design(login, { display: 'block' })
    design(name, { display: 'none' })
    design(phone, { display: 'none' })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let newAccountShow = div('signup')
  info(newAccountShow, {
    classList: 'text-center bg-white shadow w-full text-green-500'
  })
  newAccountShow.addEventListener('click', () => {
    design(login, { display: 'none' })
    design(newAccount, { display: 'block' })
    design(name, { display: 'block' })
    design(phone, { display: 'block' })
    let aud = new Audio('../pop.mp3')

    aud.play()
  })

  let panel = div([loginShow, newAccountShow])
  info(panel, {
    classList: 'flex justify-evenly w-full mb-1 text-white bg-green-800'
  })

  let ease = tag('img')
  info(ease, {
    classList: 'shadow',
    src: 'https://www.leadquizzes.com/wp-content/uploads/2019/06/New-blog-graphic-16.jpg'
  })

  let container = div([panel, name, phone, em, pas, login, newAccount, ease])

  info(container, {
    id: 'log-container',
    classList: 'mt-1 flex flex-wrap justify-center text-center'
  })

  ready(function(usr) {
    dataBase('users', usr.uid, function(data) {
      container.append(profile(data.name, data.phone, data.email))
    })
  })

  render('#log', container)
}

//home---------
const eventSearch = new Event('searchy');

let products1 = []
const finalProduct2 = (src, name, price) => {
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
  let weights = ['1kg', '2kg', '3kg', '4kg', '5kg', '6kg', '7kg', '8kg', '9kg', '10kg', '12kg', '14kg', '16kg', '18kg', '20kg']
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
      var last = finalProduct1(p5.img, p5.name, p5.price, p5.quantity)
      select('#carty-container').prepend(last)
      info(a1, {
        innerText: 'added'
      })
      let aud = new Audio('../pop.mp3')
      aud.play()
    })

  })

  let product = div([productImg, showCase, addToCart])
  info(product, {
    classList: 'shadow my-5 w-full md:w-80'
  })
  return product
}

const home = () => {
  let swiperWrapper = tag('div')
  info(swiperWrapper, {
    id: 'sWrapper',
    classList: 'swiper-wrapper '
  })

  let slide = div([swiperWrapper])
  info(slide, {
    id: 'slide-container',
    classList: 'swiper mySwiper  whitespace-nowrap overflow-scroll shadow'
  })




  dataBase('veggies', 'list', (data) => {
    let len = data.arr.length
    for (let i = 0; i < len; i++) {
      products1.push(finalProduct2(data.arr[i].img, data.arr[i].name, data.arr[i].price))
      let im = tag('img')
      info(im, {
        alt: data.arr[i].name,
        src: data.arr[i].img,
        classList: 'inline-block h-40'
      })
      let cont = div([im])
      info(cont, {
        classList: 'swiper-slide'
      })
      cont.addEventListener('click', function() {
        //affect search
        info(select('#search'), {
          value: im.alt
        })
        search.dispatchEvent(eventSearch)
      })
      swiperWrapper.append(cont)

    }
    let container = div([...products1])
    info(container, {
      id: 'cart-container',
      classList: 'flex flex-wrap'
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

//nav----

function check(checkIn, checkWhat) {
  var patt1 = new RegExp(checkWhat, "i")
  var result = checkIn.match(patt1);
  if (result == null) return 0
  return result.length
}

let dataVeg;

dataBase('veggies', 'list', function(data) {
  dataVeg = data.arr
})

const nav = () => {
  let logo = tag('img')
  info(logo, {
    src: 'https://i.ibb.co/p3fzRph/logo.jpg',
    classList: 'h-10 '
  })

  let search = tag('input')
  info(search, {
    id: 'search',
    placeholder: 'search',
    classList: 'w-full my-1 outline-none hover:bg-gray-100'
  })

  let hintList = div('')

  search.addEventListener('focus', function() {
    let aud = new Audio('../pop.mp3')
    aud.play()
    if (select('#slide-container') != undefined) {
      hide('#slide-container')
      //search.dispatchEvent(eventSearch)
    }
  })
  search.addEventListener('blur', function() {
    if (select('#slide-container') != undefined) {
      show('#slide-container')
      timeoutHide('#hint-list', 1000)
    }
  })
  search.addEventListener('keyup', () => {
    search.dispatchEvent(eventSearch)
  })
  search.addEventListener('searchy', function(e) {
    if (select('#cart-container') != undefined && select('#slide-container') != undefined) {
      info(hintList, {
        innerHTML: '',
        id: 'hint-list',
        classList: 'p-1 shadow  fixed top-10 right-0 w-auto text-center h-auto hidden bg-white'
      })

      let searchTerm = search.value
      let scores = []
      let hintdb = []
      show('#hint-list')
      for (let i in dataVeg) {
        scores.push({ index: check(dataVeg[i].name, searchTerm), value: dataVeg[i].name })
      }

      scores = scores.filter(a => a.index > 0)

      for (let i of scores) {
        for (let j of dataVeg) {
          if (i.value == j.name) {
            hintdb.push(j)
          }
        }
      }
      let products = []

      let len = hintdb.length
      for (let i = 0; i < len; i++) {
        products.push(finalProduct2(hintdb[i].img, hintdb[i].name, hintdb[i].price))
        let hlist = div(hintdb[i].name)
        info(hlist, {
          classList: 'block bg-gray-100 text-gray-800 w-40 my-1'
        })


        hlist.addEventListener('click', function(e) {
          search.value = hlist.innerText
          search.dispatchEvent(eventSearch)
          hide('#slide-container')
          hide('#hint-list')
        })




        hintList.append(hlist)
      }


      info(select('#cart-container'), {
        innerHTML: ''
      })

      for (let k of products) {
        select('#cart-container').append(k)
      }

    }
  })




  let container = div([logo, search, hintList])
  info(container, {
    classList: 'flex w-full'
  })
  info(select('#nav'), {
    classList: 'sticky flex justify-evenly items-center w-full shadow top-0 bg-white'
  })
  render("#nav", container)
}







hide('#log')
hide('#about')
hide('#cart')
show('#home')

nav()
home()
cart()
log()
bottomNav()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => 0).catch(er => 0)
  })
}

navigator.geolocation.getCurrentPosition(() => {})