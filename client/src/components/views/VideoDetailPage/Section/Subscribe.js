import React, {useEffect, useState} from "react";
import Axios from "axios";
import {message} from "antd";

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)


    useEffect(() => {

        let variable = {userTo: props.userTo} //videodetail테이블에서 바꿔주면된다

        Axios('/api/subscribe/subcribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert("구독자수 정보 받아오기 실패")
                }
            })
        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')}

        Axios.post('/api/subscribe/subcribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed)
                } else {
                    alert("정보를 받아오지못했습니다")
                }
            })
    }, [])


    return (
        <div>
            <button style={{
                backgroundColor: `${Subscribe ? "#CC0000 " :  "#AAAAAA"}`, borderRadius: '4px',
                color: "white", padding: '10px 16px',
                fontWeight: "500", fontSize: "1rem", textTransform: 'uppercase'
            }}
                    onClick
            >
                {SubscribeNumber} {Subscribed?'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe;







