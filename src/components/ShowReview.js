import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/ShowReview.css';

function ShowParty(){

    const { key, reviewid } = useParams();

    const [data, setData] = useState([]);

    function getList(){
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getReviewDataDetail',
            params: {'key': reviewid}
        }).then(res=>setData(res.data));
    }

    const handleAlert = (review_id, event) => {
        event.preventDefault();

        const requestURL = 'http://52.79.70.2:3000/addAlert';
        const alertInfo = {
            'review_id': review_id,
        }

        axios.post(requestURL, alertInfo).then(
            alert('해당 리뷰에 대한 신고가 접수되었습니다. 신고 접수 처리까지는 2~3일 소요됩니다. 감사합니다.'),
            window.location.reload()
        );
    }

    const handleRecommend = (review_id, event) => {
        event.preventDefault();

        const requestURL = 'http://52.79.70.2:3000/addRecommend';
        const recomInfo = {
            'review_id': review_id,
        }

        axios.post(requestURL, recomInfo).then(
            alert('해당 리뷰가 추천 되었습니다!'),
            window.location.reload()
        );
    }

    useEffect(()=>{

        getList();

    }, [])

    return(
        <div>
            {data.map((item)=>(
                <div>
                <h4>음식점 상세 정보 &gt; 리뷰 리스트 &gt; {key} &gt; {reviewid}</h4>
                <div className="showReview">
                    <div className="reviewTitle">
                        <label>리뷰 제목</label>
                        {item.title}
                    </div>
                    <div className="reviewTitle">
                        <label>방문한 날짜</label>
                        {item.date}
                    </div>
                    <div className="reviewTitle">
                        <label>작성자가 매긴 등급</label>
                        {item.grade}
                    </div>
                    <div className="reviewTitle">
                        <label>리뷰 내용</label>
                        {item.content}
                    </div>
                    <div className="reviewTitle">
                        <label>리뷰 추천수</label>
                        {item.recomCnt}
                    </div>
                </div>
                <div className="reviewBtm">
                    <button className="sr-btn" onClick={(event) => handleRecommend(reviewid, event)}>추천하기</button>
                    <button className="sr-btn" onClick={(event) => handleAlert(reviewid, event)}>신고하기</button>
                </div>
                </div>
            ))}
        </div>
    );
}

export default ShowParty;