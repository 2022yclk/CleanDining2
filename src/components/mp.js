import React, { useEffect, useState } from "react";
import axios from "axios";

function MyPage(){
    //console.log(sessionStorage.getItem("email"));

    const [partydata, setPartyData] = useState([]);
    const [reviewdata, setReviewData] = useState([]);

    const email = sessionStorage.getItem("email");
    //const email = "222020029";
    //console.log(email1);

    function handleOut(event){
        event.preventDefault();
        memberOut();
        window.location.href = "http://localhost:3000/"
    }

    function memberOut(){
        axios({
            method: 'post',
            url: 'http://52.79.70.2:3000/deleteUser',
            params: {'email':email}
        }).then(
            alert('회원 탈퇴가 완료되었습니다'),
        );
    }
    
    function getMyParty(){
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getMyParty',
            params: {'email': email}
        }).then(res=>setPartyData(res.data));
    }

    function getMyReview(){
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getMyReview',
            params: {'email': email}
        }).then(res=>setReviewData(res.data));
    }

    useEffect(()=>{
        getMyParty();
        getMyReview();
    }, []);

    return(
        <div>
            <h2>마이페이지</h2>
            <div className="MyList">
                <button onClick={(event)=>handleOut(event)}>탈퇴하기</button>
                <div>
                    <div>내가 생성한 파티 리스트</div>
                    {partydata.map((item) => 
                        <>
                        <div>{item.title}</div>
                        <div>{item.date.slice(0,10)}&nbsp;&nbsp;{item.hour}시 &nbsp;/&nbsp;{item.min}분</div>
                        <div>{item.gathered}/{item.gather_num}</div>
                        <div>내용{item.content}</div>
                        <div>마감기한 {item.dueDate.slice(0,10)}</div>
                        </>
                    )}
                </div>
                <hr />
                <div>
                    <div>내가 작성한 리뷰 리스트</div>
                    {reviewdata.map((item)=>
                        <>
                        <div>{item.title}</div>
                        <div>{item.date.slice(0,10)}</div>
                        <div>{item.grade}</div>
                        <div>{item.content}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}

export default MyPage;