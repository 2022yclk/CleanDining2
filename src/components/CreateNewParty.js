import React, { useState } from "react";
import { useParams } from "react-router-dom";
import '../css/CreateNewParty.css';
import axios from 'axios';

function CreateNewParty() {
    //console.log(sessionStorage.getItem("email"));
    const { id, key } = useParams();

    const [title, setTitle] = useState("");
    const [partyDate, setPartyDate] = useState("");
    const [hour, setHour] = useState(null);
    const [min, setMin] = useState(null);
    const [number, setNumber] = useState(null);
    const [briefInfo, setBriefInfo] = useState("");
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");

    const data1 = new Date();

    const handleCreate = async(event) => {

        event.preventDefault();
        const title1 = title; // title
        const partyDate1 = partyDate; // date
        const partyHour1 = hour;
        const partyMinute1 = min;
        const number1 = number; // gather_num
        const briefInfo1 = briefInfo;
        const content1 = content;
        const dueDate1 = dueDate;
        const license = key; // license_id
        const userEmail = sessionStorage.getItem("email");

        const requestURL = "http://52.79.70.2:3000/addParty";
        const partyInfo = {
            'license': license,
            'title': title1,
            'date': partyDate1,
            'hour': partyHour1,
            'min': partyMinute1,
            'briefInfo': briefInfo1,
            'gather_num': number1,
            'content': content1,
            'duedate': dueDate1,
            'resName': id, // add new
            'userEmail' : userEmail
        }

        if(number===null){
            alert('인원을 선택해주세요');
        } else if(title===""){
            alert('제목을 입력해주세요!');
        } else if(content===""){
            alert('설명을 입력해주세요!');
        } else{
            axios.post(requestURL, partyInfo).then(
                alert('새로운 파티가 등록되었습니다!'),
                window.history.back()
            ).catch(
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

    const handleHour = (event) => {
        setHour(event.target.value);
    }

    const handleMin = (event) => {
        setMin(event.target.value);
    }

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
        if(data2<data1 || data2>=data3){
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
                    <div>
                        <label for="title">Title</label>
                        <input id="title" className="p-title" type="text" placeholder="Enter Title..." value={title} onChange={handleTitle}/>
                    </div>

                    <div className="p-datediv">
                        <label>Date / Time</label>
                        <input className="p-date" type="date" value={partyDate} onChange={handleDate}/>
                        <select value={hour} onChange={handleHour}>
                            <option value="">Hour</option>
                            <option value="00">0</option>
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                        </select>
                        <select value={min} onChange={handleMin}>
                            <option value="">Min</option>
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>
                    </div>

                    <div>
                        <label for="number">인원</label>
                        <select id="number" value={number} onChange={handleNumber}>
                            <option value="">Choose ?</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>

                    <div>
                        <label>간략한 설명</label>
                        <input className="p-brinfo" value={briefInfo} placeholder="간략한 설명..." onChange={handleInfo}/>
                    </div>

                    <div>
                        <label>내용</label>
                        <textarea className="p-title" value={content} rows="7" cols="30" onChange={handleContent} required></textarea>
                    </div>

                    <div>
                        <label>DeadLine</label>
                        <input className="p-due" type="date" value={dueDate} onChange={handleDueDate} />
                    </div>

                    <button className="p-btn" onClick={handleCreate}>파티 생성</button>
                
            </div>
        </div>
    );
}

export default CreateNewParty;