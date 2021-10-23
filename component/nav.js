import { div, info, render, tag, select, design, hide, show, timeoutHide} from './apk.js';
import { dataBase, updateArray, removeArray } from './fire.js';
import { finalProduct } from './home.js';
function check(checkIn, checkWhat) {
  var patt1 = new RegExp(checkWhat, "i")
  var result = checkIn.match(patt1);
  if (result == null) return 0
  return result.length
}
const eventSearch = new Event('searchy');

let dataVeg;

dataBase('veggies','list',function(data){
  dataVeg=data.arr
})

export const nav = () => {
  let logo = tag('img')
  info(logo, {
    src: 'https://i.ibb.co/p3fzRph/logo.jpg',
    classList: 'h-10 '
  })
  
  let search = tag('input')
  info(search, {
    id:'search',
    placeholder: 'search',
    classList: 'w-full my-1 outline-none hover:bg-gray-100'
  })
  
  let hintList=div('')
  
  search.addEventListener('focus',function(){
    let aud = new Audio('../pop.mp3')
  aud.play()
  if(select('#slide-container')!=undefined){
    hide('#slide-container')
    //search.dispatchEvent(eventSearch)
  }
  })
  search.addEventListener('blur',function(){
    if(select('#slide-container')!=undefined){
    show('#slide-container')
    timeoutHide('#hint-list',1000)
    }
  })
  search.addEventListener('keyup',()=>{
   search.dispatchEvent(eventSearch)
  })
  search.addEventListener('searchy', function(e){
    if(select('#cart-container')!=undefined && select('#slide-container')!=undefined ){
    info(hintList, {
      innerHTML:'',
      id: 'hint-list',
      classList: 'p-1 shadow  fixed top-10 right-0 w-auto text-center h-auto hidden bg-white'
    })
    
    let searchTerm = search.value
      let scores = []
      let hintdb=[]
      show('#hint-list')
      for (let i in dataVeg) {
        scores.push({ index: check(dataVeg[i].name, searchTerm), value: dataVeg[i].name })
      }
      
      scores = scores.filter(a => a.index > 0)
      
      for(let i of scores){
       for(let j of dataVeg){
         if(i.value==j.name){
           hintdb.push(j)
         }
       }
      }
    let products=[]
    
    let len = hintdb.length
    for (let i = 0; i < len; i++) {
      products.push(finalProduct(hintdb[i].img, hintdb[i].name, hintdb[i].price))
      let hlist=div(hintdb[i].name)
      info(hlist,{
        classList:'block bg-gray-100 text-gray-800 w-40 my-1'
      })
      
      
      hlist.addEventListener('click', function(e){
        console.log('h',hlist.innerText)
        search.value=hlist.innerText
        search.dispatchEvent(eventSearch)
         hide('#slide-container')
         hide('#hint-list')
      })
      
      
     
      
      hintList.append(hlist)
    }
    
    
    info(select('#cart-container'),{
      innerHTML:''
    })
    
    for(let k of products){
      select('#cart-container').append(k)
    }
    
  }
  })




  let container = div([logo, search, hintList])
  info(container, {
    classList: 'flex w-full'
  })
  info(select('#nav'),{
    classList:'sticky flex justify-evenly items-center w-full shadow top-0 bg-white'
  })
  render("#nav", container)
}
