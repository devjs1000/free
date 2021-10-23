import { div, info, render, tag, design, hide, show, fa, timeoutHide, select} from './apk.js';
import {registerFn, loginFn, ready, dataBase} from './fire.js';

function checkPhone(num){
  num=num.trim()
  if(num.length<15 && num.length>9){
    if (num.length == 10) {
      if (!isNaN(num)) {
        return true
      }
    }
    if(num[0]=='+'){
      if(num.indexOf(' ')!=-1){
      if(num.split(' ')[1].length==10 && !isNaN(num.split(' ')[1])){
        return true
      }
      }
      if(num.indexOf(' ') == -1) {
        if (num.split('+')[1].length == 12 && !isNaN(num.split('+')[1])) {
          return true
        }
      }
      
    }
    if(num.length==12){
      if(!isNaN(num)){
        return true
      }
    }
    if(num.length==11 && num[0]==0){
      if(!isNaN(num)){
        return true
      }
    }
    if(num.indexOf(' ')!=-1){
      if(num.split(' ')[1].length==10 && !isNaN(num.split(' ')[1])){
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

const profile=(nm, ph, em)=>{
  let name=div(nm)
  let n=div('name')
  let c1=div([n, name])
  info(n,{
    classList:'w-20 font-bold'
  })
  info(c1,{
    classList:'bg-green-800 mt-1 flex w-full text-white'
  })
  
  info(name,{
    classList:'pl-3 bg-white hover:bg-gray-100 w-full md:w-60 text-left text-gray-800'
  })
  
  let phone=div(ph)
  let p=div('phone')
  let c2=div([p, phone])
info(p, {
  classList: 'w-20 font-bold'
})
  info(c2,{
    classList:'bg-green-800 mt-1 flex w-full text-white'
  })
  info(phone,{
    classList:'pl-3 hover:bg-gray-100 bg-white w-full md:w-60  hover:bg-white text-left text-gray-800'
  })
  
  let email=div(em)
  let e=div('email')
  let c3=div([e, email])
  info(e, {
    classList: 'w-20 font-bold'
  })
  info(c3, {
    classList: 'bg-green-800 mt-1 flex w-full text-white'
  })
  info(email, {
    classList: 'pl-3 bg-white text-left hover:bg-gray-100 md:w-60 w-full text-gray-800'
  })
  
  let container=div([c1, c2, c3])
  info(container,{
    id:'profile',
    classList:'shadow flex flex-wrap'
  })
  return container
}

export const log=()=>{
  let name=tag('input')
  info(name,{
    type:'text',
    id:'name',
    placeholder:'name',
    classList:'bg-gray-100 mx-2 px-2 block w-full md:w-1/2 my-1 outline-none'
  })
  
  let em=tag('input')
  info(em,{
    type:'email',
    id:'email',
    placeholder:'email',
    classList:'bg-gray-100 mx-2 px-2 block my-1 w-full md:w-1/2 outline-none'
  })
  
  let phone=tag('input')
  info(phone, {
    type:'number',
    id:'phone',
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
  
  let a1=div('login ')
  let a2=div([a1, fa('fa fa-sign-in')])
  info(a2,{
    classList:'flex justify-center items-center'
  })
  let login=div([a2])
  info(login, {
    classList:'bg-green-500 p-1 flex my-1 w-full md:w-60 text-green-50'
  })
   design(login, {
     display:'none'
   })
   login.addEventListener('click', ()=>{
    loginFn(em, pas)
    let aud = new Audio('../pop.mp3')
    aud.play()
  })
  
  let a3=div('create new account ')
  let a4=div([a3, fa('fa fa-user-plus')])
  info(a4,{
    classList:'flex justify-center items-center'
  })
  let newAccount = div([a4])
  info(newAccount, {
    classList: 'md:w-60 bg-green-500 p-1 my-1 block w-full text-green-50'
  })
  newAccount.addEventListener('click', ()=>{
    if(checkPhone(phone.value)){
    registerFn(em, pas, name, phone)
    }
    let aud = new Audio('../pop.mp3')

    aud.play()
  })
  
  let loginShow=div('login')
  info(loginShow,{
    classList:'text-center w-full bg-white shadow text-green-500'
  })
  loginShow.addEventListener('click', ()=>{
    design(newAccount, {display:'none'})
    design(login, {display: 'block'})
    design(name, {display: 'none'})
    design(phone, {display: 'none'})
    let aud = new Audio('../pop.mp3')

    aud.play()
  })
  
  let newAccountShow=div('signup')
  info(newAccountShow,{
    classList:'text-center bg-white shadow w-full text-green-500'
  })
  newAccountShow.addEventListener('click', ()=>{
    design(login, {display:'none'})
    design(newAccount, {display: 'block'})
    design(name, {display: 'block'})
    design(phone, {display: 'block'})
    let aud = new Audio('../pop.mp3')

    aud.play()
  })
  
  let panel=div([loginShow,newAccountShow])
  info(panel,{
    classList:'flex justify-evenly w-full mb-1 text-white bg-green-800'
  })
  
  let ease=tag('img')
  info(ease, {
    classList:'shadow',
    src:'https://www.leadquizzes.com/wp-content/uploads/2019/06/New-blog-graphic-16.jpg'
  })
  
  let container=div([panel,name,phone,em,pas,login, newAccount, ease])
  
  info(container, {
    id:'log-container',
    classList: 'mt-1 flex flex-wrap justify-center text-center'
  })
  
  ready(function(usr){
    dataBase('users', usr.uid, function(data){
      container.append(profile(data.name, data.phone, data.email))
    })
  })
  
  render('#log', container)
}
