import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/WatchDetailInfo.css';
import axios from 'axios';

function WatchDetailInfo(){

    const {id, addr, grade, key, addr2, phone, cat} = useParams();

    const [data, setData] = useState([]);
    
    const handleReview = (event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/writeReview/${id}/${key}`;
    }

    const handleClick = (review_id, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/showReview/${key}/${review_id}`;
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

    function getList(){
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
            <div className="wd-cate">{cat}</div>
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
            <div className="top-wdt-mid">{addr2}</div>
            <div className="wdt-mid">
                <div>Tel)&nbsp;{phone}</div>
            </div>
            <button className="review-btn">위생 신고</button>
            <button className="review-btn" onClick={(event) => handleReview(event)}>리뷰 쓰기</button>
            <div className="watch-bottom">
                최근 리뷰
            </div>
            <div className="wd-bottom">
                        <div className="list">
                            {data.map((item)=>(
                                <div className="partylist">
                                    <div className="wd-top">
                                        <div>{item.writer_id}admin34(Test Value)</div>
                                        <button className="wd-btn" onClick={(event) => handleRecommend(item.review_id, event)}>추천</button>
                                        <button className="wd-btn" onClick={(event) => handleAlert(item.review_id, event)}>신고</button>
                                    </div>
                                    <div className="wd-mid" onClick={(event)=>handleClick(item.review_id, event)}>
                                        <div className="wd-midtitle">
                                            <div className="wd-midtitle-1">{item.title}</div>
                                            <div className="wd-midtitle-2">추천 수&nbsp;&nbsp;{item.recomCnt}</div>
                                        </div>
                                        <div className="wd-midcon">{item.content}</div>
                                    </div>
                                    <div className="wd-btm">
                                        <div className="wd-btm-date">{item.date.slice(0,10)} 방문</div>
                                    </div>
                                </div>
                            ))}
                        </div>
            </div>
        </div>
    );
}

export default WatchDetailInfo;