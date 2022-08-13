function getE(selecter){
    return document.querySelector(selecter);
}
function throttle(fnc, time) {
    let flag = true
    return (path) => {
        if (flag) {
            flag = false
            fnc(path)
            setTimeout(() => { flag = true }, time)
        }
    }
}
fetch(`http://127.0.0.1/getbodybyid/${location.search.replace(/\?id=/,'')}`)
.then(res=>res.json())
.then((res)=>{
    const {title,body,nickName,avatar,intro}=res
    getE('.detail-title').innerHTML=title
    getE('.datail-nickName').innerHTML=nickName
    getE('.detail-intro').innerHTML=intro
    getE('.detail-header img').src=avatar
    getE('.detail-body').innerHTML=body
})
.then(()=>{
    // document.querySelectorAll("pre").forEach((v) => (v.className = "language-css"));
    // document.querySelectorAll("code").forEach((v) => (v.className = "language-css"));
    const script=document.createElement('script')
    script.src='./codeheightlight/index.js'
    document.body.appendChild(script)
})
.then(()=>new Promise((rs,rj)=>{
    const catalog=document.querySelector('.catalog');
    let maxlevel=6;
    [6,5,4,3,2,1].map(num=>{    
        document.querySelectorAll(`h${num}`).forEach((h,k)=>{h.setAttribute('catalog',num);h.setAttribute('id',num+''+k);maxlevel=num})
    })
    document.querySelectorAll('[catalog]').forEach(v=>{
        catalog.insertAdjacentHTML('beforeend',`<a href='#${v.getAttribute('id')}' style='text-indent:${(v.getAttribute('catalog')-maxlevel)*20}px'>${v.innerText.trim()}</a>`);
    })
    setTimeout(() => {
        rs()
    }, 0);
})  
).then(()=>{
    const catalogs=getE('.catalog').querySelectorAll('a')
    const hs=getE('.detail-body').querySelectorAll('[catalog]')
    let throttleScroll=throttle(()=>{
        hs.forEach((item,key)=>{
            if(item.offsetTop-40<=window.pageYOffset && hs[key + 1].offsetTop>=window.pageYOffset){
                catalogs.forEach(v=>v.classList.remove('heightlight'));
                catalogs[key].classList.add('heightlight');
                getE('.catalog').scrollTop=catalogs[key].offsetTop-150           }
        })
    },200)
    document.addEventListener('scroll',()=>{
        throttleScroll()
    })
})