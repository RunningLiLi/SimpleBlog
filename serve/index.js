const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser');
const {nanoid}=require('nanoid')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const {find,Constructor}=require('./database')
app.get('/getbodybyid/:id',(req,res)=>{
    find({id:req.params.id},{},(err,ret)=>{
        if(err)res.send(err)
        else{
            res.send(ret[0])
        }
    })
})
app.get('/mine',(req,res)=>{
    find({type:'DIY'},{body:0},(err,ret)=>{
        if(err)res.send(err)
        else{
            res.send(ret)
        }
    })
})
app.post('/upload',(req,res)=>{
    const aticle = new Constructor({
        id:nanoid(),
        type:'DIY',
        title:req.body.title?req.body.title:'这个人很懒，没有标题',
        intro:req.body.body?req.body.intro:'这个人很懒，没有介绍',
        nickName:"奔跑的lili",
        body:req.body.body
    });
     aticle.save(function (err, ret) {
        if (err) {
            res.send('ok')
        } else {
            res.send('err')
        }
    });
})
app.get(`/:type`,(req,res)=>{
    find({type:req.params.type},{body:0},(err,ret)=>{
        if(err)res.send(err)
        else{
            let arrRandom=[]
            console.log(ret.length)
            for (let i=0;i<10;i++){
                let random=Math.floor(Math.random()*(ret.length-1))
                arrRandom.push(ret[random])
            }
            res.send(arrRandom)
        }
    })
})
// app.get('/random',(req,res)=>{
//     find((err,ret)=>{
//         if(err)console.log(err)
//         else{
//             let arrRandom=[]
//             for (let i=0;i<10;i++){
//                 arrRandom.push(ret[Math.floor(Math.random()*(ret.length-1))])
//             }
//             res.send(arrRandom)
//         }
//     })
// })
app.listen(80,()=>{console.log('http://127.0.0.1')})