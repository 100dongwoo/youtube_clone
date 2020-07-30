import React, {useEffect, useState} from "react";
import {Tooltip, Icon} from "antd";
import Axios from "axios";

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null)


    const [Dislikes, setDislikes] = useState(0);
    const [DisLikeAction, setDisLikeAction] = useState(null)


    let variable = {}
    if (props.video)
        variable = {videoId: props.videoId, userId: props.userId}
    else { //커멘트에서온거 singleComment 에서 가져옴 action에서
        variable = {commentId: props.commentId, userId: props.userId}
    }


    useEffect(() => {       //정보가저올떄 사용한다 DB에서

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {

                    //얼마나 많이 좋아요를 받았는지
                    setLikes(response.data.likes.length) //얼마나 좋아요 받았는지 나온다 이것 state


                    //내가 이미 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked') //이미 눌렀다
                        }
                    })
                } else {
                    alert("Likes데이터정보를가져오지못했습니다.")
                }
            })

///////DISLIKE정보가져오기
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {

                    //얼마나 많이 싫어요를를 받았는지
                    setDislikes(response.data.dislikes.length) //얼마나 좋아요 받았는지 나온다 이것 state


                    //내가 이미 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDisLikeAction('disliked') //이미 눌렀다
                        }
                    })
                } else {
                    alert("DisLikes데이터정보를가져오지못했습니다.")
                }
            })


    }, [])


    const onLike = () => {
        if (LikeAction === null) {//클릭이안되있을떄
            Axios.post('/api/like/uplike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DisLikeAction !== null) {//클릭이 되있다면
                            setDisLikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert("like올리지못했습니다.")
                    }
                })
        } else {  //클릭되있을떄


            Axios.post('/api/like/unlike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert("like올 내리지못했습니다..")
                    }
                })


        }
    }


    const onDislike = () => {

        if (DisLikeAction !== null) {

            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDisLikeAction(null)
                    } else {
                        alert("DisLike을지우지못했습니다.")
                    }
                })
        } else {       //클릭되지 않을떄

            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDisLikeAction('disliked')
                        if (LikeAction !== null) { //like클릭이 되있다면
                            setLikeAction(null);
                            setLikes(Likes - 1)
                        }

                    } else {
                        alert("DisLike을올리지못했습니다.")
                    }
                })


        }

    }


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={LikeAction === 'liked' ? "filled" : "outlined"}
                          onClick={onLike}
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: "auto"}}> {Likes}</span>
            </span>

            <span key={"comment-basic-dislike"}>
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                          theme={DisLikeAction === "disliked" ? "filled" : "outlined"}
                          onClick={onDislike}
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: "auto"}}> {Dislikes}

                </span>
            </span>

        </div>
    )

}


export default LikeDislikes