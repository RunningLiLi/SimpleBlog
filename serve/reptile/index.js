const { getHrefs } = require("./hrefarray.js")
const { HTMLTOMd } = require("./htmltomd.cjs")
const { Constructor } = require("../database")
// import {nanoid} from 'nanoid'
const { nanoid } = require("nanoid")
const types=['web','back-end','mobile','ai','product-ops','ios']
types.map(type=>{
    getHrefs('web')
    .then((res) => {
        async function test() {
            let arr = []
            for (let i = 0; i < res.length; i++) {
                arr.push(await HTMLTOMd(res[i]))
            }
            return arr
        }
        return test()
    })
    .then((res) => {
        res.map(one => {
            const { title, avatar, nickName, body } = one
            const aticle = new Constructor({
                id: nanoid(),
                type,
                title,
                avatar,
                nickName,
                body,
            });
            aticle.save(function (err, ret) {
                if (err) {
                    console.log('保存失败');
                } else {
                    console.log('保存成功');
                }
            });
        })


})
})
