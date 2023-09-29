const moongoose = require('mongoose')

const ConversationSchema = moongoose.Schema(
    {
        members: {
            type: Array,
            required: true
        }
    }
)
const Conversation = moongoose.model("Conversation", ConversationSchema)

module.exports=Conversation