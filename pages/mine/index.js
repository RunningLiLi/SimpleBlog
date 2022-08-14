fetch('http://localhost/mine')
    .then((res) => res.json())
    .then((res) => {
        res.map(one => {
            const { title, nickName, intro, id } = one
            const onestr = `<div class="show-one" data-id=${id}><span class="one-title">${title}</span><img src='../../resource/0.webp'  class="one-avatar"><span class="one-nickName">${nickName}</span><span class="one-intro">${intro}</span></div>`
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
            window.open(`../aticledetail/index.html?id=${element.dataset.id}`)
        })
    })