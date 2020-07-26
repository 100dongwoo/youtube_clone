const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ViedeoSchema = mongoose.Schema({

    writer: {
        type: Schema.Type.Object, //이렇게만넣어도 model/user에 정보를 불러올수있따
        ref: 'User'                  //유저모델에서 불러온다는뜻
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration:{
        type:String
    },
    thumbnail:{
        type:String
    }


},{timestamp:true}) //만든것과 업데이트한거 분류
//이게 비디오 컬렉션

const Video = mongoose.model('User', ViedeoSchema);

module.exports = {Video}