const express = require('express');
const router = express.Router();
const {Subscriber} = require("../models/Subcriber")


//=================================
//             subscribe
//=================================

router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            //subscribe에는 userTo를구독하는 모든 정보가 들어있따
            if (err) return res.status(400).send(err)
             res.status(200).json({success: true, subscribeNumber: subscribe.length})
        })
})


router.post("/subscribed", (req, res) => {

    Subscriber.find({'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)
            let result = false;
            if (subscribe.length !== 0) { //자신이 구독을하는지 안하는지를 알수있따.
                result = true
            }
            res.status(200).json({success: true, subscribed: result})
        })

})
//구독 중일떄 버튼을 구독버튼누를떄
router.post("/unSubscribe", (req, res) => {

    Subscriber.findOneAndDelete({userTo: req.body.userTo, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true, doc})
        })

})

//구독이  아닐떄

router.post("/subscribe", (req, res) => {

    const subscribe=new Subscriber(req.body)
    subscribe.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })

})




module.exports = router;
