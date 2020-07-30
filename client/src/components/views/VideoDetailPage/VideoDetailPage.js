import React, {useEffect, useState} from "react";
import {Row, Col, Avatar, List} from "antd"
import Axios from "axios"
import SideVideo from "./Section/SideVideo";
import Comment from "./Section/Comment";
import Subscribe from "./Section/Subscribe"

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId///URL 에서 가져옴

    const variable = {videoId: videoId}

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert("비디오정보를 가져오기실패")
                }
            })


        //COMMENT기능에서 보내주기위함
        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    //모든 커맨트정보를 받는다..
                    setComments(response.data.comments)
                } else {
                    alert("코멘트정보를 가져오기 싫패했습니다")
                }
            })


    }, [])
//state 바꿔주는거
    const refreshFunction = (newcomment) => {
        console.log("리프레쉬 작동")
        setComments(Comments.concat(newcomment)) //추가하는거

    }



    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') &&
            <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%', height: '100%'}}
                               src={`http://localhost:5000/${VideoDetail.filePath}`}
                               controls/>

                        <List.Item
                            actions={[subscribeButton]}

                        >

                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>} //populate해서 가능합
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        <Comment
                            refreshFunction={refreshFunction}
                            commentLists={Comments}
                            postId={videoId}
                        />

                    </div>
                </Col>


                {/*사이드비디오*/}
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>

        )
    } else {
        return (<div> ...loading</div>)

    }

}

export default VideoDetailPage