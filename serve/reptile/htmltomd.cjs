const https = require('https')
const cheerio = require('cheerio')
const html2md = require('html-to-md')
const fs = require('fs')
module.exports.HTMLTOMd = (href) => new Promise((resolve, reject) => {
    const req = https.request(href, async (res) => {
        const chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
        })
        res.on('end', () => {
            try {
                const htmlstr = Buffer.concat(chunks).toString("utf-8")
                let body = htmlstr.match(/<article (([\s\S])*?)<\/article>/)[0]
                let title = htmlstr.match(/<title>(([\s\S])*?)<\/title>/)[0].replace(/<title>|<\/title>/g, '')
                let nickName = htmlstr.match(/var nickName = "(([\s\S])*?)"/)[0].replace(/var nickName = "|"/g, '')
                let avatar = htmlstr.match(/var avatar = "(([\s\S])*?)"/)[0].replace(/var avatar = "|"/g, '');
                let intro = htmlstr.match(/var articleDesc = "(([\s\S])*?)"/)[0].replace(/var articleDesc = "|"/g, '');
                let $ = cheerio.load(body)
                // fs.writeFile('./dist.html',htmlstr,()=>{});return;
                resolve({ body, title, nickName, avatar, intro })
            } catch (e) {
                
            }

        })
    })
    req.end()
})



