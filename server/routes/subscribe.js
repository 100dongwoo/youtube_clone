const express = require('express');
const router = express.Router();
const multer = require("multer")
const {Subscriber} = require("../models/Subcriber")


//=================================
//             subscribe
//=================================

router.post("/subcribeNumber", (req, res) => {

    Subscriber.find({'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            //subscribe에는 userTo를구독하는 모든 정보가 들어있따
            if (err) return res.status(400).send(err)
            return res.status(400).json({success: true, subscribeNumber: subscribe.length})
        })
})


router.post("/subcribed", (req, res) => {

    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)
           let result=false;
            if(subscribe.length!==0){ //자신이 구독을하는지 안하는지를 알수있따.
                result=true
            }
            res.status(200).json({success:true,subscribed:result})
        })

})
module.exports = router;
