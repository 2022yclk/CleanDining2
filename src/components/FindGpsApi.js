import React, {useState} from 'react';
import FindGpsResult from './FindGpsResult.js';
import Loading from './Loading';
import '../css/FindGps.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const FindGpsApi = ({addr, print}) => {

    const [dataMap, setDataMap] = useState([]);
    const [dataMap2, setDataMap2] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        callApi(addr);
    }

    const callApi = async (uri) => {
        setLoading(true);
        try {

            var current_uri = encodeURI(`http://openapi.foodsafetykorea.go.kr/api/ef03c3ddff5742b7bf91/C004/json/1/500/ADDR=${uri}`);
            
            console.log(current_uri);
            const response = await fetch(current_uri);
            const result = await response.json();

            cutad(result);

            setDataMap(result);
            setLoading(false);

        } catch (error) {
            //window.alert(error);
            //setLoading(false);
        }
    }

    function cutad(result){
        var tmpar = [];
        for(var i=0;i<result.C004.total_count;i++){
            var tmp = result.C004.row[i].ADDR;
            var tmp1 = tmp.indexOf('(');
            var detailAddr = tmp.slice(0, tmp1);
            tmpar.push(detailAddr);
        }
        setDataMap2(tmpar);
    }

    return (
        <div>
            <Grid container >
                <Grid item sx={{ mt:1 }} xs><h2>현재위치: {print}</h2></Grid>
                <Grid item sx={{ mt:1 }}><Button variant="contained" color="success"  sx={{ mt:3 }} onClick = {handleClick}>검색하기</Button></Grid>
            </Grid>

            <br />
            {loading ? <Loading /> : <FindGpsResult data1={dataMap} data2={dataMap2}/>}
        </div>
    );
}

export default FindGpsApi;