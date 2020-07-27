import React, {useEffect, useState} from "react";
import {Row, Col, Avatar, List} from "antd"
import Axios from "axios"


function VideoDetailPage(props) {

    const videoId = props.match.params.videoId///URL 에서 가져옴
    const variable = {videoId: videoId}

    const [VideoDetail, setVideoDetail] = useState([]);


    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert("비디오정보를 가져오기실패")
                }
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={10} xs={24}>

                    <div style={{width: '100%', padding: '3rem 4rem'}}>


                        {/*비디오 eero*/}
                        <video style={{width: '100%'}} src={`http://localhost:3000/${VideoDetail.filePath}`} controls/>


                        <List.Item actions>

                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                    </div>


                </Col>
                <Col lg={6} xs={24}>
                    sideVideos
                </Col>
            </Row>

        )
    } else {
        return (<div> ...loading</div>)

    }

}

export default VideoDetailPage