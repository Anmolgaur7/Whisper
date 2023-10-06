const moongoose = require('mongoose')

const MessagesSchema = moongoose.Schema(
    {
        conversationid: {
            type: String,
        },
        senderid: {
            type: String,
        },
        message: {
            type: String,
        }
    }
)
const  Messages = moongoose.model("message", MessagesSchema)

module.exports= Messages