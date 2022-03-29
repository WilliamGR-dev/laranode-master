const User =  require("../Models/User")

module.exports = class UserRepository {
constructor(req, res) {
    this.res = res
}
   async all() {
       const results = await User.findAll();
       const users = results.rows;
       this.res.write(JSON.stringify(users));
       this.res.end();
   }
   async get(id) {
    const results = await User.findById(id);
    const user = results.rows;
    return user
}
   async create(name, email, password){
    try {
        const res = await User.create(name, email, password)
        this.res.write(JSON.stringify(res.rows));
      } catch (err) {
        console.log(err.stack)
      }
    this.res.end()
   }
   async update(id, name, email, password){
    try {
        const res = await User.update(id, name, email, password)
        return res
      } catch (err) {
        console.log(err.stack)
      }
   }
   async delete(id){
    try {
        const res = await User.remove(id)
        return res
      } catch (err) {
        console.log(err.stack)
      }
   }
}
