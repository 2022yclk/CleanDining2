import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/WatchDetailInfo.css';
import axios from 'axios';

function WatchDetailInfo(){

    const {id, addr, grade, key} = useParams();

    const [data, setData] = useState([]);
    
    const handleReview = (id, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/writeReview/${id}/${key}`;
    }

    const handleClick = (review_id, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/showReview/${key}/${review_id}`;
    }

    const handleAlert = (review_id, event) => {
        event.preventDefault();
        // 리뷰 아이디를 넘겨서 디비 테이블 값 변경
        // UPDATE review SET alertCnt = alertCnt + 1 WHERE review_id = ?

        const requestURL = 'http://52.79.70.2:3000/addAlert';
        const alertInfo = {
            'review_id': review_id,
        }

        axios.post(requestURL, alertInfo).then(
            alert('해당 리뷰에 대한 신고가 접수되었습니다. 신고 접수 처리까지는 2~3일 소요됩니다. 감사합니다.'),
            window.location.reload()
        );
    }

    function getList(){
        //console.log(key);
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getReviewData',
            params: {'key': key}
        }).then(res=>setData(res.data));
    }

    useEffect(()=>{

        getList();

    }, [])

    return(
        <div>
            <div className="logo"><img alt="logo" src="./assets/logo.png"/></div>
            <div className="top">
                <div>
                    <div className="id">{id}</div> 
                    <div className="showad">{addr}</div>
                    <div className="w-grade">
                        <div className="gradeTitle">위생등급</div>
                        <div className="gradegrade">{grade}</div>
                    </div>
                </div>
            </div>
            <button className="review-btn" onClick={(event) => handleReview(event)}>리뷰 쓰기</button>
            <div className="watch-bottom">
                최근 리뷰
            </div>
            <div className="review-list">
                <ul>
                    {data.map((item)=>(
                        <div className="reviewUlItem">
                            <div className="reviewlist" onClick={(event) => handleClick(item.review_id, event)}>{item.title}{item.alertCnt}</div>
                            <button className="reviewAlertBtn" onClick={(event) => handleAlert(item.review_id, event)}>해당 리뷰 신고</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default WatchDetailInfo;