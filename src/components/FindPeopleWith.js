import React from 'react';
import { useParams } from "react-router-dom";
import '../css/FindPeopleWith.css';
//import { BrowserRouter, Routes,Route } from 'react-router-dom';

function FindPeopleWith(){
    
    // 음식점 id value
    const { id, addr, grade, key } = useParams();

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
                    <ul>
                        <li>
                            <div className="partylist" onClick={(event)=>handleClick(id, event)}>click to show...</div>
                        </li>    
                        <li>2</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FindPeopleWith;