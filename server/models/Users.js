const moongoose = require('mongoose')

const UserSchema = moongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String
        }
    }
)
const Users = moongoose.model("User", UserSchema)

module.exports=Users