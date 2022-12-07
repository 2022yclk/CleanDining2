import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/CreateNewParty.css';
import axios from 'axios';

function CreateNewParty() {

    const { id, key } = useParams();

    const [title, setTitle] = useState("");
    const [partyDate, setPartyDate] = useState("");
    const [number, setNumber] = useState(null);
    const [briefInfo, setBriefInfo] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");

    const data1 = new Date();

    const handleCreate = async(event) => {

        event.preventDefault();
        const title1 = title; // title
        const partyDate1 = partyDate; // date
        const number1 = number; // gather_num
        const briefInfo1 = briefInfo;
        const content1 = content;
        const dueDate1 = dueDate;
        const license = key; // license_id

        const requestURL = "http://52.79.70.2:3000/addParty";
        const partyInfo = {
            'license': license,
            'title': title1,
            'date': partyDate1,
            'briefInfo': briefInfo1,
            'gather_num': number1,
            'content': content1,
            'duedate': dueDate1
        }

        if(number===null){
            alert('인원을 선택해주세요');
        } else if(title===""){
            alert('제목을 입력해주세요!');
        } else if(content===""){
            alert('설명을 입력해주세요!');
        } else{
            axios.post(requestURL, partyInfo).catch(
                error => {
                    return alert(error);
                });
        }

    }

    const handleDate = (event) => {
        const data2 = new Date(event.target.value); // 날짜 변환
        if(data2<data1){ // 모임 날짜 설정을 오늘 이전 날짜로 한다면 다시 입력
            alert('모임 날짜를 다시 선택해주세요!');
            setPartyDate("");
        } else{
            setPartyDate(event.target.value);
        }
    };

    const handleNumber = (event) => {
        setNumber(event.target.value);
    }
    
    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleInfo = (event) => {
        setBriefInfo(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    const handleDueDate = (event) => {
        const data2 = new Date(event.target.value);
        const data3 = new Date(partyDate);
        if(data2<data1 || data2>data3){
            alert('마감기한을 다시 선택해주세요!');
            setDueDate("");
        } else{
            setDueDate(event.target.value);
        }
    }

    return(
        <div>
            <div className="logo"><img alt="logo" src="./assets/logo.png"/></div>
            <div className="top">
                <div>
                    <div className="id">{id}</div> 
                </div>
            </div>
            <div className="cre-bottom">
                    <label for="title" className="first-time">Title</label>
                    <input id="title" type="text" placeholder="Enter Title..." value={title} onChange={handleTitle} required/>

                    <label>Date</label>
                    <input type="date" value={partyDate} onChange={handleDate}/>

                    <label for="number">인원</label>
                    <select id="number" value={number} onChange={handleNumber}>
                        <option value="">Choose ?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    <label>간략한 설명</label>
                    <input value={briefInfo} placeholder="간략한 설명..." onChange={handleInfo} required/>

                    <label>내용</label>
                    <textarea value={content} rows="7" cols="30" onChange={handleContent} required></textarea>

                    <label>DeadLine</label>
                    <input type="date" value={dueDate} onChange={handleDueDate} />

                    <button class="buttonclass" onClick={handleCreate}>파티 생성</button>
                
            </div>
        </div>
    );
}

export default CreateNewParty;