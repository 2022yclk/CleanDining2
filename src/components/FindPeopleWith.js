import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import '../css/FindPeopleWith.css';
import axios from 'axios';
//import { BrowserRouter, Routes,Route } from 'react-router-dom';

function FindPeopleWith(){
    
    // 음식점 id value
    const { id, addr, grade, key } = useParams();
    const [data, setData] = useState([]);

    const handleShow = (data, addr, grade, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/watchDetailInfo/${data}/${addr}/${grade}/${key}`;
    }

    const handleCreate = (data, key, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/createNewParty/${data}/${key}`;
    }

    const handleClick = (data, event) => {
        event.preventDefault();
        window.location.href = `http://localhost:3000/showParty/${data}`;
    }
    
    function getList(){
        //console.log(key);
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
            <div className="center">
                <button className="createBtn" onClick={(event) => handleCreate(id, key, event)}>새로운 파티 만들기</button>
                <button className="watch" onClick={(event) => handleShow(id, addr, grade, key, event)}>음식점 세부정보 보기</button>
            </div>
            <div className="bottom">
                <div className="party">파티 리스트</div>
                <div className="list">
                    {data.map((item)=>(
                        <div className="partylist" onClick={(event)=>handleClick(item.post_id, event)}>{item.title}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FindPeopleWith;