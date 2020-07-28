import React, {useEffect, useState} from 'react'
import {FaCode} from "react-icons/fa";
import axios from "axios";
import {Card, Icon, Avatar, Col, Typography, Row} from "antd";
import moment from 'moment';

const {Title} = Typography
const {Meta} = Card

//<hr/> 밑줄

//antd 디지인에서 row col 가져온거.
// 사이트의 크기를 줄일떄 1로우에 4개 비디오
// 줄일때 는 24사이즈
function LandingPage() {

    const [Video, setVideo] = useState([])  //state이며 랜딩페이지에 올릴것들 저장 array에


    //db에서 가져오는  소스
    useEffect(() => {       //돔이 로드되자마자 무엇을 할지 정함  COMPONENTMOUNT랑비슷
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideo(response.data.videos)
                } else {
                    alert("비디오 가져오기실패")
                }
            })
    }, [])
    //1번만하는다 [], []없으면 계속


    const renderCard = Video.map((video, index) => {

        var minutes = Math.floor([video.duration] / 60)
        var seconds = Math.floor((video.duration - minutes * 60))
        return (
            <Col lg={6} md={8} xs={24}>
                {/*전체가 24 사이즈 인데 미디움일떈 8 가장클떄는 1컬럼이 6 (4개가짐)*/}
                <a href={`/video/post/${video._id}`}>
                    <div style={{position: "relative"}}>
                        <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`}/>
                        <div className="duration">
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                </a>
                <br/>
                <Meta
                    avatar={
                        <Avatar src={video.writer.image}/>
                    }
                    title={video.title}
                    description=""
                />



                <span>{video.writer.name}</span><br/>
                <span style={{marginLeft: '3rem'}}>{video.views} views</span>
                - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
            </Col>

        )
    })


    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2}>Recommend</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
        </div>
    )
}

export default LandingPage
