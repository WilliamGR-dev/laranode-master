// const UserController = require('../app/Controllers/UserController.js')
module.exports = class Router {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.res.not_found = true;
        this.res.method_not_allowed = true;
    }

    getPostData(req) {
        return new Promise((resolve, reject) => {
            try {
                let body = ''

                req.on('data', (chunk) => {
                    body += chunk.toString()
                })

                req.on('end', () => {
                    resolve(body)
                })
            } catch (error) {
                reject(err)
            }
        })
    }

    get(url, callback) {

        if (url.includes(':')){
            let urlExplode = url.split(':');
            let paramsName = urlExplode.find(element => !element.includes('/'))
            let paramsIndex = urlExplode.findIndex(element => !element.includes('/'))+1
            let reqUrl = this.req.url.split('/');
            let paramsValue = reqUrl[paramsIndex];
            if (Number.isInteger(parseInt(paramsValue))){

                if(this.req.method === 'GET'){
                    this.res.method_not_allowed = false;
                    let urlCheck = urlExplode;
                    urlCheck[paramsIndex-1] = ':'+paramsName
                    if (urlCheck.join('') === url){
                        this.res.not_found = false;
                        this.req.paramsName = paramsName;
                        this.req.paramsValue = paramsValue;
                        return callback(this.req, this.res)
                    }
                }
                else {
                    return false;
                }

            }
            else {
                console.log('bad params')
            }
        }else{
            if (this.req.url == url){
                this.res.not_found = false;
                if(this.req.method === 'GET'){
                    this.res.method_not_allowed = false;
                    return callback(this.req, this.res)
                }
                else{
                    return false;
                }
            }
        }

    }

    post(url, callback) {
        if (this.req.url == url){
            this.res.not_found = false;

            if(this.req.method === 'POST'){
                this.res.method_not_allowed = false;
                return callback(this.req, this.res)
            }
            else{
                return false;
            }

        }

    }

    put(url, callback) {
        if (url.includes(':')){
            let urlExplode = url.split(':');
            let paramsName = urlExplode.find(element => !element.includes('/'))
            let paramsIndex = urlExplode.findIndex(element => !element.includes('/'))+1
            let reqUrl = this.req.url.split('/');
            let paramsValue = reqUrl[paramsIndex];
            if (Number.isInteger(parseInt(paramsValue))){
                if(this.req.method === 'PUT'){
                    this.res.method_not_allowed = false;
                    let urlCheck = urlExplode;
                    urlCheck[paramsIndex-1] = ':'+paramsName
                    if (urlCheck.join('') === url){
                        this.res.not_found = false;
                        this.req.paramsName = paramsName;
                        this.req.paramsValue = paramsValue;
                        return callback(this.req, this.res)
                    }
                }
                else{
                    return false;
                }

            }
            else {
                console.log('bad params')
            }
        }else{
            console.log('bad request')
        }

    }

    delete(url, callback) {

        if (url.includes(':')){
            let urlExplode = url.split(':');
            let paramsName = urlExplode.find(element => !element.includes('/'))
            let paramsIndex = urlExplode.findIndex(element => !element.includes('/'))+1
            let reqUrl = this.req.url.split('/');
            let paramsValue = reqUrl[paramsIndex];
            if (Number.isInteger(parseInt(paramsValue))){
                if(this.req.method === 'DELETE'){
                    this.res.method_not_allowed = false;
                    let urlCheck = urlExplode;
                    urlCheck[paramsIndex-1] = ':'+paramsName
                    if (urlCheck.join('') === url){
                        this.res.not_found = false;
                        this.req.paramsName = paramsName;
                        this.req.paramsValue = paramsValue;
                        return callback(this.req, this.res)
                    }
                }
                else{
                    return false;
                }

            }
            else {
                console.log('bad params')
            }
        }else{
            console.log('bad request')
        }
    }

    end() {
        if (this.res.not_found){
            this.res.writeHead(404, { "Content-type": "text/plain" })
            this.res.write('404: File not found');
            this.res.end();
            return false;
        }
        if (this.res.method_not_allowed){
            this.res.writeHead(405, { "Content-type": "text/plain" })
            this.res.write('405: Method not allowed');
            this.res.end();
            return false;
        }
    }
}
