const https = require('https')
const cheerio = require('cheerio')
const html2md = require('html-to-md')
module.exports.HTMLTOMd = (href) => new Promise((resolve,reject)=>{
        const req = https.request(href, async (res) => {
            const chunks = []
            res.on('data', (chunk) => {
                chunks.push(chunk)
            })
            res.on('end', () => {
                let body = html2md(Buffer.concat(chunks).toString("utf-8").match(/<article (([\s\S])*?)<\/article>/)[0])
                let title = Buffer.concat(chunks).toString("utf-8").match(/<title>(([\s\S])*?)<\/title>/)[0].replace(/<title>|<\/title>/g,'')
                let nickname= Buffer.concat(chunks).toString("utf-8").match(/var nickName = "(([\s\S])*?)"/)[0].replace(/var nickName = "|"/g,'')
                let avatar = Buffer.concat(chunks).toString("utf-8").match(/var avatar = "(([\s\S])*?)"/)[0].replace(/var avatar = "|"/g,'');
                let $ = cheerio.load(body)
                resolve({body,title,nickname,avatar})
            })
        })
        req.end()
})



