import React, {useState} from "react";
import {useSelector} from "react-redux";
import Axios from "axios";

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