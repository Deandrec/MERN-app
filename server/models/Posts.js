import mongoose from "mongoose";

const postShchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath : String,
        userPicturePath: String,
        // if liked add to map, if not liked remove from map
        likes: {
            type: Map,
            of: Boolean
        },
        comments :{
            type : Array,
            default: []
        }
    },
    {timestamps: true}
)

const Post = mongoose.model("Post", postShchema);

export default Post;