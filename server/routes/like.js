const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");
//=================================
//          Like
//=================================

router.post("/getLikes", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId}
    else {
        variable = {commentId: req.body.commentId}
    }


    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, likes})
        })
})



//싫어요

router.post("/getDislikes", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId}
    else {
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, dislikes})
        })
})


//비디오아이디랑 유저아이디를 매칭되는것을찾고 지우는 과정


router.post("/uplike", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    // LIKE Collection에다가 클릭정보를 넣어준다

    const like = new Like(variable)
    like.save((err, likeResult) => {
        if (err) return res.json({success: false, err})


        // 만약에 dislike이 이미 클릭도있으면 그것을 dislike을 1줄여준다.

        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    })

})


router.post("/unlike", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }


    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true });
        })
})


//////////////싫어요 부분


router.post("/unDislike", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }


    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })
})


router.post("/upDislike", (req, res) => {

    //두 가지로 나뉜다
    let variable = {}

    if (req.body.videoId)
        variable = {videoId: req.body.videoId, userId: req.body.userId}
    else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }


    // disLIKE Collection에다가 클릭정보를 넣어준다

    const dislike = new Dislike(variable)
    dislike.save((err, dislikeResult) => {
        if (err) return res.json({success: false, err})


        // 만약에 like이 이미 클릭도있으면 그것을 dislike을 1줄여준다.

        Like.findOneAndDelete(variable)
            .exec((err, LikeResult) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    })

})


module.exports = router;
