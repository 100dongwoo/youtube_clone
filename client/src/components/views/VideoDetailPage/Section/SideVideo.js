import React, {useEffect, useState} from "react";
import axios from "axios";

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log("됬따")
                    console.log(response.data.videos)
                    setsideVideos(response.data.videos)
                } else {
                    alert("사이드비디오정보를 가져오기실패")
                }
            })
    }, [])


    const renderSideVideo = sideVideos.map((video, index) => {
        var minutes = Math.floor([video.duration] / 60)
        var seconds = Math.floor((video.duration - minutes * 60))
        return (
            <div key={index} style={{display: 'flex', marginBottom: "1rem", padding: '0 2rem'}}>
                <div style={{width: '40%', marginRight: '1rem'}}>
                    <a href ={`/video/${video._id}`}>
                        <img style={{width: '100%', height: '100%'}}
                             src={`http://localhost:5000/${video.thumbnail}`}
                         //    src={"https://i.pinimg.com/originals/b2/ab/5f/b2ab5f7368c36af2c000ebf94055efb0.jpg"}
                             alt="썸네일"/>
                    </a>
                </div>
                {/*왼쪽부분*/}


                <div style={{width: '50%'}}>
                    <a href
                       style={{color: "gray"}}>
                        <span style={{fontSize: '1rem', color: 'black'}}> {video.Title}</span><br/>
                        <span>{video.writer.name}</span><br/>
                        <span>{video.views} views</span><br/>
                        <span>{minutes}:{seconds}</span>
                    </a>
                </div>

            </div>
        )
    })


    return (

        <React.Fragment>
            <div style={{marginTop: '3rem'}}>
                {renderSideVideo}
            </div>
        </React.Fragment>


    )
}


export default SideVideo