import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../css/ShowParty.css';

function ShowParty(){

    const { key, postid } = useParams();
    const [data, setData] = useState([]);

    function getList(){
        //console.log(key);
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getPartyDataDetail',
            params: {'key': postid}
        }).then(res=>setData(res.data));
    }

    console.log(data.gathered);

    const hanldeParticipate = (event) => {
        event.preventDefault();
        const requestURL = "http://52.79.70.2:3000/participateParty";
        const participateInfo = {
            'postid': postid,
        }
        
        if(data.gather_num<=data.gathered){
            alert('이미 모집인원이 다 찼습니다!');
        } else{
            axios.post(requestURL, participateInfo).then(
                alert('모임 참가 신청이 완료되었습니다. 주선자가 참가 신청을 수락하면 문자로 알림이 가게 됩니다!'),
                window.location.reload()
            ).catch(
                error=>{
                    return alert(error);
                });
        }
    }


    useEffect(()=>{

        getList();

    }, [])

    return(
        <div>
            {data.map((item)=>(
                <div>
                    <h4>같이 먹을 사람 찾기 &gt; 파티 리스트 &gt; {key} &gt; {postid}</h4>
                    <div className="partyFind">
                        <div className="partyTitle">
                            <label>Title</label>
                            {item.title}
                        </div>
                        <div className="partyTitle">
                            <label>Date / Time </label>
                            {item.date}{item.time}
                        </div>
                        <div className="partyTitle">
                            <label>Due Date </label>
                            {item.dueDate}
                        </div>
                        <div className="partyPeople">
                            <div>
                                <label>모집 인원</label>
                                {item.gather_num}
                            </div>
                            <div>
                                <label className="ppul">현재 모집된 인원</label>
                                {item.gathered}
                            </div>
                        </div>
                        <div className="partyTitle">
                            <label>내용</label>
                            {item.content}
                        </div>
                        <button className="sp-btn" onClick={hanldeParticipate}>파티 참가하기</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShowParty;