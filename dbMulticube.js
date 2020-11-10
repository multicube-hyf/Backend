import mangoose from 'mongoose'

//define all schemas -

const adminSchema  = mangoose.Schema({
    name: String,
    username: String,
    password: String
})
export default mangoose.model('admin', adminSchema)