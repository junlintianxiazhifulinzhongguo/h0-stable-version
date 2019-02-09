import mongoose from 'mongoose'
const Administrators = mongoose.model("Administrators");
const getAll = async () =>{
    let query = {}
    const result =await Administrators.find(query)
    return result
}
const  getByUsername = async (username) =>{
    let query = {}
    if(username)
    {
        query.username = username
    }
    const result =await Administrators.find(query)
    return result
}
export {
    getAll,
    getByUsername
}