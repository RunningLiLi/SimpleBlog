const express=require('express')
const cors=require('cors')
const bodyParser = require('body-parser');
const {nanoid}=require('nanoid')
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const {find,Constructor,remove,update}=require('./database')
app.get('/getbodybyid/:id',(req,res)=>{
    find({id:req.params.id},{},(err,ret)=>{
        if(err)res.send(err)
        else{
            res.send(ret[0])
        }
    })
})
app.get('/delete',(req,res)=>{
    remove({id:req.query.id},(err,ret)=>{
        if(err)res.send(err)
        else res.send(ret)
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
    if(!req.body.id){
        const aticle = new Constructor({
            id:nanoid(),
            type:'DIY',
            avatar:"https://profile.csdnimg.cn/3/0/F/3_weixin_52212950"
            ,
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
    }else{
        update({id:req.body.id}, {
            title:req.body.title?req.body.title:'这个人很懒，没有标题',
            intro:req.body.intro?req.body.intro:'这个人很懒，没有介绍',
            body:req.body.body
        }, function(err, ret) {
            if (err) {
                res.send(err)
            } else {
                res.send(ret)
            }
        });
    }
    
})
app.get(`/:type`,(req,res)=>{
    find({type:req.params.type},{body:0},(err,ret)=>{
        if(err)res.send(err)
        else{
            let arrRandom=[]
            for (let i=0;i<10;i++){
                let random=Math.floor(Math.random()*(ret.length-1))
                arrRandom.push(ret[random])
            }
            res.send(arrRandom)
        }
    })
})
app.listen(80,()=>{console.log('http://127.0.0.1')})