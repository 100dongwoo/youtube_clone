import React, {useState} from "react";
import {useSelector} from "react-redux";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment"

function Comment(props) {
    const videoId = props.postId;
    const user = useSelector(state => state.user);//리덕스 훅ㅇㄹ사용함
    const [commentValue, setCommentValue] = useState("")
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()      //리프래쉬안함

        const variable = {
            content: commentValue,
            writer: user.userData._id,                     //localstorge가능
            postId: videoId    //props가능 ,url에서가져오는것도가능능
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("");
                    props.refreshFunction(response.data.result);

                } else {
                    alert("커맨트저장에 실패했습니다.")
                }
            });
    };


    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>

            {/*Comment list*/}

            {props.commentLists &&
            props.commentLists.map(
                (comment, index) =>
                (!comment.responseTo &&  //이게없으면 그냥 전부 한줄에 다 뜸
                //댓글에 댓글 단것들을 줄이는역할을한다 조건을 줘서
                    <React.Fragment key={index}>
                        <SingleComment
                            refreshFunction={props.refreshFunction}
                            key={index}
                            comment={comment}
                            postId={videoId}
                        />
                        <ReplyComment
                            refreshFunction={props.refreshFunction}
                            parentCommentId={comment._id}
                            postId={videoId}
                            commentLists={props.commentLists}
                        />


                    </React.Fragment>
                )
            )}


            {/* 이밑에가 커맨트트*/}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={handleClick}
                        value={commentValue}
                        placeholder="코멘트작성해주세요"
                    />
                <br/>
                <button style={{width: '20%', height: '52px'}}
                        onClick={onSubmit}
                >Submit
                </button>
            </form>
        </div>
    )
}

export default Comment
