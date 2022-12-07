import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

    useEffect(()=>{

        getList();

    }, [])

    return(
        <div>
            {data.map((item)=>(
                <div>
                    <div>{item.title}</div>
                    <div>{item.date}</div>
                    <div>{item.gather_num}</div>
                    <div>{item.content}</div>
                </div>
            ))}
        </div>
    );
}

export default ShowParty;