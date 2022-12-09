import React, { useEffect } from "react";
import FindGpsResult from "./FindGpsResult";

const {kakao} = window;

const FindGpsComp = ({data}) => {

    //console.log(data);
    //console.log(data.length);
    //console.log(data.C004.row.ADDR);

    /*for(var i=0;i<data.length;i++){
        var tmp = data.C004.row[i].ADDR;
        var tmp1 = tmp.indexOf('(');
        //var detailAddr = data[i].slice(0, tmp1);
        //console.log(detailAddr);
    }*/

    useEffect(()=>{
        //const ps = new kakao.maps.services.Places();
    
        //var detailAddr = addr + ' 맛집';
        //var detailAddr = '서울특별시 중구 퇴계로 197';
        
        
        
        /*
        ps.keywordSearch(detailAddr, placesSearchCB);
        
        function placesSearchCB(data, status, pagination){
            if(status === kakao.maps.services.Status.OK){

                console.log(data);
                    
            } else if(status === kakao.maps.services.status.ERROR){
        
                alert('오류 발생');
                return;
        
            } else if(status === kakao.maps.services.status.ZERO_RESULT){
        
                alert('검색결과가 존재하지 않습니다');
                    return;
        
            }
        }*/

    }, []);

    return(
        <FindGpsResult data={data} />
    );
}

export default FindGpsComp;