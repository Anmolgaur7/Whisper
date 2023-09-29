const moongoose = require('mongoose')

const MessagesSchema = moongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        message: {
            type: String,
        }
    }
)
const  Messages = moongoose.model("message", MessagesSchema)

module.exports= Messages