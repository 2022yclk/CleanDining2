import React, {useState} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../css/WriteReview.css'

function WriteReview() {

    const {id, key} = useParams();

    const [title, setTitle] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [grade, setGrade] = useState("");
    const [content, setContent] = useState("");

    const handleCreate = (event) => {
        event.preventDefault();
        const title1 = title;
        const visitDate1 = visitDate;
        const grade1 = grade;
        const content1 = content;
        const license = key;
        const requestURL = "http://52.79.70.2:3000/addReview";
        const reviewInfo = {
            'license': license,
            'title': title1,
            'visitDate': visitDate1,
            'grade': grade1,
            'content': content1
        }
        if(title===""){
            alert('제목을 입력해주세요');
        } else if(grade===""){
            alert('등급을 선택해주세요!');
        } else if(content===""){
            alert('설명을 입력해주세요!');
        } else{
            axios.post(requestURL, reviewInfo).then(
                alert('소중한 리뷰가 정상적으로 등록되었습니다!'),
                window.history.back()
            ).catch(
                error => {
                    return alert(error);
                });
        }
    }

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleVisit = (event) => {
        const data1 = new Date();
        const data2 = new Date(event.target.value);
        if(data2>data1){
            alert('방문했던 날짜를 다시 선택해주세요');
            setVisitDate("");
        } else{
            setVisitDate(event.target.value);
        }
    }
    
    const handleGrade = (event) => {
        setGrade(event.target.value);
    }

    const handleContent = (event) => {
        setContent(event.target.value);
    }

    return(
        <div>
            <div className="logo"><img alt="logo" src="./assets/logo.png"/></div>
            <div className="top">
                <div>
                    <div className="id">{id}</div> 
                    <div className="grade">
                        
                    </div>
                </div>
            </div>
            <div className="cre-bottom">
                <div>
                    <label for="title" className="first-time">Review Title</label>
                    <input id="title" className="w-title" type="text" placeholder="Enter Title..." name="title" onChange={handleTitle}/>
                </div>

                <div>
                    <label>방문한 날짜</label>
                    <input className="w-date" type="date" name="partyDate" onChange={handleVisit}/>
                </div>

                <div>
                    <label>내가 매기는 위생등급</label>
                    <select className="wm-grade" value={grade} onChange={handleGrade}>
                        <option value="">Select Grade</option>
                        <option value="매우우수">매우 우수</option>
                        <option value="우수">우수</option>
                        <option value="좋음">좋음</option>
                    </select>
                </div>

                <div>
                    <label>내용</label>
                    <textarea className="w-title" name="content" rows="7" cols="30" onChange={handleContent}></textarea>
                </div>

                <button className="w-btn" onClick={handleCreate}>리뷰 작성</button>
            </div>
        </div>
    );
}

export default WriteReview;