const { getHrefs } = require("./hrefarray.js")
const { HTMLTOMd } = require("./htmltomd.cjs")
const { Constructor } = require("../database")
const { nanoid } = require("nanoid")
const types = ['web', 'back-end', 'mobile', 'ai', 'product-ops', 'python']
types.map(type => {
    getHrefs(type)
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
                const { title, avatar, nickName, body ,intro} = one
                const aticle = new Constructor({
                    id: nanoid(),
                    type,
                    title,
                    intro,
                    avatar,
                    nickName,
                    body
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
