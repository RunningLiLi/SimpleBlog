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
const throttlefetch=throttle((path) => {
    fetch(`http://localhost/${path}`)
    .then(res => res.json())
    .then(res => {
        const showbody = document.querySelector('.show-body')
        res.map(one => {
            const { title, nickName, avatar, intro, id } = one
            const onestr = `<div class="show-one" data-id=${id}><span class="one-title">${title}</span><img src=${avatar}  class="one-avatar"><span class="one-nickName">${nickName}</span><span class="one-intro">${intro}</span></div>`
            showbody.insertAdjacentHTML('beforeend', onestr);
        })
    })
},200)
// 初始化
fetch('http://localhost/web')
    .then((res) => res.json())
    .then((res) => {
        res.map(one => {
            const { title, nickName, avatar, intro, id } = one
            const onestr = `<div class="show-one" data-id=${id}><span class="one-title">${title}</span><img src=${avatar}  class="one-avatar"><span class="one-nickName">${nickName}</span><span class="one-intro">${intro}</span></div>`
            document.querySelector('.show-body').insertAdjacentHTML('beforeend', onestr)
        })
    })
    .then(() => {
        document.querySelector(".show-body").addEventListener('click', (e) => {
            let element = e.target
            while (element.className != 'show-one') {
                element = element.parentElement;
            }
            element.style.backgroundColor = 'rgb(244, 244, 244)'
            window.open(`./aticledetail/index.html?id=${element.dataset.id}`)
        })
    })
//给导航栏添加点击事件
document.querySelectorAll(".show-nav li").forEach(but => {
    but.addEventListener('click', () => {
        fetch(`http://localhost/${but.innerHTML}`)
            .then((res) => res.json())
            .then((res) => {
                const showbody = document.querySelector('.show-body')
                showbody.innerHTML = ''
                res.map(one => {
                    const { title, nickName, avatar, intro, id } = one
                    const onestr = `<div class="show-one" data-id=${id}><span class="one-title">${title}</span><img src=${avatar}  class="one-avatar"><span class="one-nickName">${nickName}</span><span class="one-intro">${intro}</span></div>`
                    showbody.insertAdjacentHTML('beforeend', onestr);
                })
            })
        document.querySelectorAll(".show-nav li").forEach(v => { v.classList.remove('but-heightlight') })
        but.classList.add('but-heightlight')
    })
    but.addEventListener('mousedown', (e) => {
        e.preventDefault()
    })
})
//无限滚动
document.addEventListener("scroll", () => {
    scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    if (scrollHeight-window.pageYOffset<document.documentElement.clientHeight+800) {
        const path = document.querySelector('.but-heightlight').innerHTML;
        throttlefetch(path)
    }

});
//rollup
document.addEventListener('scroll',()=>{
    if(window.pageYOffset>document.documentElement.clientHeight){
        document.querySelector('.rollup').style.display='block'
    }else{
        document.querySelector('.rollup').style.display='none'
    }
})
document.querySelector('.rollup').addEventListener('click',()=>{
    window.scrollTo(0,0)
})