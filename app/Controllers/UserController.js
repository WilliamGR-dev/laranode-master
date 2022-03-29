const UserRepository = require("../Repository/UserRepository")

module.exports = class UserController {
constructor(req, res) {
    this.req = req
    this.res = res
}
   async getAll() {
        const users = new UserRepository(this.req, this.res);
       const results = await users.all();
       return results;
   }
   async get(id) {
   const users = new UserRepository(this.req, this.res);
   const results = await users.get(id);
   if(results.length == 0){
      this.res.writeHead(404, { "Content-type": "text/plain" })
      this.res.write('User not found '+ id);
      this.res.end();
   }
   else{
      this.res.write(JSON.stringify(results));
      this.res.end();
      return results;
   }

}
   async post(name, email, password){
    if (name == undefined || email == undefined || password == undefined){
        this.res.writeHead(422, { "Content-type": "text/plain" })
        this.res.write('Not all required field');
        this.res.end()
    }
    if (name == '' || email == '' || password == ''){
        this.res.writeHead(422, { "Content-type": "text/plain" })
        this.res.write('Not all required field is empty');
        this.res.end()
    }
    const users = new UserRepository(this.req, this.res);
    const results = await users.create(name, email, password);
    return results;
   }
   async update(id, name, email, password){

       if (name == undefined || email == undefined || password == undefined){
           this.res.writeHead(422, { "Content-type": "text/plain" })
           this.res.write('Not all required field');
           this.res.end(`error 422 Unprocessable Entity`)
       }
       if (name == '' || email == '' || password == ''){
           this.res.writeHead(422, { "Content-type": "text/plain" })
           this.res.write('Not all required field is empty');
           this.res.end(`error 422 Unprocessable Entity`)
       }
    const users = new UserRepository(this.req, this.res);
    const results = await users.update(id, name, email, password);
    if(results.rowCount == 0){
      this.res.writeHead(404, { "Content-type": "text/plain" })
      this.res.write('User not found'+ id);
      this.res.end();
   }
   else{
      this.res.writeHead(200, { "Content-type": "text/plain" })
      this.res.write('User updated');
      this.res.end();
      return results;
   }
   }
   async delete(id){
    const users = new UserRepository(this.req, this.res);
    const results = await users.delete(id);
    if(results.rowCount == 0){
      this.res.writeHead(404, { "Content-type": "text/plain" })
      this.res.write('User not found'+ id);
      this.res.end();
   }
   else{
      this.res.writeHead(200, { "Content-type": "text/plain" })
      this.res.write('User deleted');
      this.res.end();
      return results;
   }
   }
}
