const https = require('https')
module.exports.getHrefs = (mes = 'web') => {
    return new Promise((resolve, rejrct) => {
        const req = https.request(`https://blog.csdn.net/nav/web`, async (res) => {
            const chunks = []
            res.on('data', (chunk) => {
                chunks.push(chunk)
            })
            res.on('end', () => {
                resolve(Buffer.concat(chunks).toString("utf-8").match(/<div class=" active-blog">(([\s\S])*?)<\/div>/g)
                .map(v => v.match(/<a target="_blank"(([\s\S])*?)<\/a>/)[0].match(/href="(([\s\S])*?)"/)[0].match(/"(([\s\S])*?)"/)[0].replace(/"/g,''))
                )
            })
        })
        req.end()
    })
}


