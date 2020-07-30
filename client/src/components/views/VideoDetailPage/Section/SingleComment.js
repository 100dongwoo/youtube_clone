import React, {useState} from "react";
import {Comment, Avatar, Button, Input} from "antd";
import Axios from "axios";
import {useSelector} from "react-redux";
import LikeDislikes from "./LikeDislikes";

function SingleComment(props) {

    const user = useSelector(state => state.user);//리덕스 훅ㅇㄹ사용함
    const [openReply, setOpenReply] = useState(false)

    const onClickReplyOpenReply = () => {
        setOpenReply(!openReply)
    }


    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpenReply} key="comment-basic-reply-to">Reply to</span>
    ]

    const [CommentValue, setCommentValue] = useState("")

    const unHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content: CommentValue,
            writer: user.userData._id,                     //localstorge가능
            postId: props.postId ,  //props가능 ,url에서가져오는것도가능능
            responseTo:props.comment._id

        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("저장성공하였습니다.");
                    setCommentValue("");
                    setOpenReply(false);
                    props.refreshFunction(response.data.result);
                } else {
                    alert("커맨트저장에 실패했습니다.")
                }
            })
    }


    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt={"avatar"} />}
                content ={<p> {props.comment.content}</p>}
            />

            {openReply &&
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={unHandleChange}
                        value={CommentValue}
                        placeholder="코멘트작성해주세요"
                    />
                <br/>
                <button style={{width: '20%', height: '52px'}}
                        onClick={onSubmit}>Submit
                </button>
            </form>
            }
        </div>
    )
}


export default SingleComment;









