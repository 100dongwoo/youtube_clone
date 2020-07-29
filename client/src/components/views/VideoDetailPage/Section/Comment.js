import React, {useState} from "react";
import {useSelector} from "react-redux";
import Axios from "axios";
import SingleComment from "./SingleComment";

function Comment(props) {


    const videoId = props.postId
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
                    console.log(response.data.result)
                    setCommentValue("")
                    props.refreshFunction(response.data.result)


                } else {
                    alert("커맨트저장에 실패했습니다.")
                }
            })

    }


    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>

            {/*Comment list*/}
            {props.commentList && props.commentList.map((comment,index)=>(

                (!comment.responseTo && //댓글에 댓글 단것들을 줄이는역할을한다 조건을 줘서
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
                )



            ))}




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