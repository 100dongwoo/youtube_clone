const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dislikeSchema = mongoose.Schema({


    //userid : 누가 좋아요를눌렀는지
    //commentid: 커맨트//좋아요 구분
    // videoid:비디오 // 좋아요 구분

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }

},  { timestamps: true }

)

const Dislike = mongoose.model("Dislike", dislikeSchema);


module.exports = {Dislike}


