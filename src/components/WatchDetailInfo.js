import React from "react";
import { useParams } from "react-router-dom";
import '../css/WatchDetailInfo.css';

function WatchDetailInfo(){

    const {id, addr, grade, key} = useParams();
    
    const handleReview = (id, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/writeReview/${id}/${key}`;
    }

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
            <button className="review-btn" onClick={(event) => handleReview(id, key, event)}>리뷰 쓰기</button>
            <div className="watch-bottom">
                최근 리뷰
            </div>
            <div className="review-list">
                <ul>
                    <li>
                        <div className="reviewlist" onClick>click to show...</div>
                    </li>    
                    <li>2</li>
                </ul>
            </div>
        </div>
    );
}

export default WatchDetailInfo;