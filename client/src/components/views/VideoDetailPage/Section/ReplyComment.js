import React, {useEffect, useState} from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
    //답글이없어서 reply가 생성되는거방지c
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber)

    }, [props.commentLists])

    //[]이면 1번만된다 로드될떄
    //바꾼건 이부분이 바꿀떄마다 렌더링시킨다는말


    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment key={index}>
                {
                    comment.responseTo === parentCommentId &&(
                    <div style={{width: "80%", marginLeft: "90px"}}>

                        <SingleComment
                            comment={comment}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}

                        />
                        <ReplyComment
                            commentLists={props.commentLists}
                            parentCommentId={comment._id}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}
                            />
                    </div>
                    ) }
            </React.Fragment>
        ))



    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 && (
                <p
                    style={{ fontSize: "14px", margin: 0, color: "gray" }}
                    onClick={onHandleChange}
                >
                    View {ChildCommentNumber} more comment(s)
                </p>
            )}
            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    );
}

export default ReplyComment;