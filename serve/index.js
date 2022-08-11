const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
const {find}=require('./database')
app.get('/getbodybyid/:id',(req,res)=>{
    find({id:req.params.id},{},(err,ret)=>{
        if(err)res.send(err)
        else{
            res.send(ret[0])
        }
    })
})
app.get(`/:type`,(req,res)=>{
    find({type:req.params.type},{},(err,ret)=>{
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