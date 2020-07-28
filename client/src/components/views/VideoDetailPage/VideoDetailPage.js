import React, {useEffect, useState} from "react";
import {Row, Col, Avatar, List} from "antd"
import Axios from "axios"
import SideVideo from "./Section/SideVideo";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId///URL 에서 가져옴
    const variable = {videoId: videoId}

    const [VideoDetail, setVideoDetail] = useState([]);


    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    console.log("가져오기성공")
                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert("비디오정보를 가져오기실패")
                }
            })
    }, [])

    if (VideoDetail.writer) {

        console.log(VideoDetail)
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '35%', height:'150%'}} src={`http://localhost:5000/${VideoDetail.filePath}`}
                               controls/>

                        <List.Item actions>

                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>} //populate해서 가능합
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
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