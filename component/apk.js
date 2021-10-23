export const  tag = xx => document.createElement(xx)
export const  render = (xx, yy) => {
  document.querySelector(xx).append(yy)
}

export const  div = xx => {
  let e1 = tag('div')
  if (typeof xx != 'object'){
    e1.append(xx)
  }
  if (typeof xx == 'object') {
    for (let i in xx) {
      e1.append(xx[i])
    }
  }
  return e1
}

export const design=(xx, yy)=>{
  let p1=Object.keys(yy)
  for(let i in p1){
    xx.style[p1[i]]=yy[p1[i]]
  }
}

export const select=xx=>document.querySelector(xx)
export const selectAll=xx=>document.querySelectorAll(xx)
export const id=xx=>document.getElementById(xx)

export const info=(xx,yy)=>{
  let p1=Object.keys(yy)
  for(let i in p1){
    xx[p1[i]]=yy[p1[i]]
  }
}

export const hide=(xx)=>{
  design(select(xx),{
    display:'none'
  })
}
export const show=(xx)=>{
  design(select(xx),{
    display:'block'
  })
}

export const fa=(xx)=>{
  let t1=tag('i')
  t1.classList=xx
  return t1
}

export const timeoutHide=(el, tm)=>{
  setTimeout(()=>{hide(el)},tm)
}
