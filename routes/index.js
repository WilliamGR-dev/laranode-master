const url = require("url")
const Router = require ('../bootstrap/Router')
const UserController = require("../app/Controllers/UserController");

module.exports = class routes {
    constructor(req, res) {
        this.req = req
        this.res = res
        const router = new Router(this.req, this.res)

        router.get("/",  (req, res) => {
            res.write('Bienvenue dans Laranode');
            res.end();
          });

        router.get("/users", (req, res) => {
            const userController = new UserController(req, res);
            userController.getAll();
          });

        router.get("/users/:id", (req, res) => {
            const userController = new UserController(req, res);
            userController.get(req.paramsValue);
          });

        router.put("/users/:id", async (req, res) => {
            const userController = new UserController(req, res);
            const body = router.getPostData(this.req)
            let isJson = true;
            body.then(function(result) {
                try {JSON.parse(result);}
                catch(e) {
                    isJson = false;
                    res.writeHead(422, { "Content-type": "text/plain" })
                    res.end(`error ${res.statusCode} Unprocessable Entity`)
                }});
            if (isJson){
                const form = JSON.parse(await router.getPostData(this.req))
                userController.update(req.paramsValue, form.name, form.email, form.password);
            }


          });

        router.post("/users", async (req, res) => {
            const userController = new UserController(this.req, this.res);

            const body = router.getPostData(this.req)
            let isJson = true;
            body.then(function(result) {
                try {JSON.parse(result);}
                catch(e) {
                    isJson = false;
                    res.writeHead(422, { "Content-type": "text/plain" })
                    res.end(`error ${res.statusCode} Unprocessable Entity`)
                }});
            if (isJson){
                const form = JSON.parse(await router.getPostData(this.req));
                userController.post(form.name, form.email, form.password)
            }

          });

        router.delete("/users/:id", (req, res) => {
            const userController = new UserController(this.req, this.res);
            userController.delete(req.paramsValue)
          });

        router.end();

    }
}
