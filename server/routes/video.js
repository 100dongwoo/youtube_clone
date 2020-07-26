const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");
const {auth} = require("../middleware/auth");
const multer = require("multer")


let storage = multer.diskStorage({
    destination: (req, file, cb) => {       //ddestination 어디에 저장하까 ?그거
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext=path.extname(file.originalname);
        if (ext !== '.mp4') {  //png 하고싶으면 && ext!=='.png' 이런형식
            return cb(res.status(400).end('only mp4 is allowed'), false)
        }
        cb(null, true)
    }
})
const upload = multer({storage: storage}).single("file")//파일은한개만


//=================================
//             Video
//=================================


// router.post('/api/video/uplaodfiles') index에갔다가 오는거기떄문에
router.post('/uploadfiles', (req, res) => { //이거만해도됨
//req 통해파일받음
    //클라이언트에 서받은 비디오 서버 저장
    upload(req,res,err=>{
        if(err){
            return res.json({success:false,err})
        }
        return res.json({success:true,url:res.req.file.path,fileName:res.req.file.filename})
    })
})
module.exports = router;
