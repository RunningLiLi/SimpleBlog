const express=require('express')
// const cors=require('cors')
const app=express()
// app.use(cors)
const {find}=require('./database')
app.get(`/:type`,(req,res)=>{
    find({type:req.params.type},(err,ret)=>{
        if(err)console.log(err)
        else{
            let arrRandom=[]
            for (let i=0;i<10;i++){
                arrRandom.push(ret[Math.floor(Math.random()*(ret.length-1))]);
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