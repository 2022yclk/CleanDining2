import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import '../css/FindPeopleWith.css';
import axios from 'axios';

function FindPeopleWith(){
    
    // 음식점 id value
    const { id, addr, grade, key, addr2, phone, cat } = useParams();
    const [data, setData] = useState([]);

    const handleShow = (id, key, addr, addr2, grade, phone, cat, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/watchDetailInfo/${id}/${key}/${addr}/${addr2}/${grade}/${phone}/${cat}`;
    }

    const handleCreate = (data, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/createNewParty/${data}/${key}`;
    }

    const handleClick = (data, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/showParty/${key}/${data}`;
    }
    
    function getList(){
        axios({
            method: 'get',
            url: 'http://52.79.70.2:3000/getPartyData',
            params: {'key': key}
        }).then(res=>setData(res.data));
    }

    useEffect(()=>{

        getList();

    }, [])

    return(
        <div>
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
            <div className="center">
                <button className="createBtn" onClick={(event) => handleCreate(id, key, event)}>새로운 파티 만들기</button>
                <button className="watchBtn" onClick={(event) => handleShow(id, key, addr, addr2, grade, phone, cat, event)}>음식점 세부정보 및 리뷰보기</button>
            </div>
            <div className="bottom">
                <div className="party">파티 리스트</div>
                <div className="list">
                    {data.map((item)=>(
                        <div className="partylist">
                            <div className="pi-top">
                                <div>{item.writer_id}admin34(Test Value)</div>
                                <button onClick={(event)=>handleClick(item.post_id, event)}>파티 확인</button>
                            </div>
                            <div className="pi-mid">
                                {item.title}
                            </div>
                            <div className="pi-btm">
                                <div className="pi-btm-date">{item.date.slice(0,10)}</div>
                                <div className="pi-btm-txt">현재 인원&nbsp;/&nbsp;정원</div>
                                <div className="pi-btm-num">{item.gathered}&nbsp;/&nbsp;{item.gather_num}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FindPeopleWith;