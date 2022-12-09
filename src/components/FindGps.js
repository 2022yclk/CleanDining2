import React, {useEffect, useState} from 'react';
import FindGpsApi from './FindGpsApi.js';
import Loading from './Loading.js';
import '../css/FindGps.css';
import { flattenOptionGroups } from '@mui/base';

const {kakao} = window; 

const FindGps = () => {

    //const [Places, setPlaces] = useState([]);
    const [addr, setAddr] = useState("");
    const [print, setPrint] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longtitude, setLongtitude] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect (()=>{

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

                setLatitude(lat);
                setLongtitude(lon);

            });
        } else {
            //var locPosition = new kakao.maps.LatLng(37.557523, 126.998186), // gps 허용이 안될때, 기본주소 충무로
            //    message = '<div style="padding:5px;">geolocation을 사용할 수 없어요..</div>';
    
            // displayGpsMarker(locPosition, message);
        }
    
        // 주소-좌표 객체 생성
        var geocoder = new kakao.maps.services.Geocoder();
    
        var callback = function(result, status){
            if(status === kakao.maps.services.Status.OK){
                for(var i=0;i<result.length;i++){
                    if(result[i].region_type==='H'){
                        //console.log(result[i].region_3depth_name);
                        setAddr(result[i].region_3depth_name);
                        setLoading(false);
                    }
                    if(result[i].region_type==='B'){
                        setPrint(result[i].address_name);
                    }
                }
            }
        }
    
        geocoder.coord2RegionCode(longtitude, latitude, callback);
    
        /*
        const ps = new kakao.maps.services.Places();
    
        //var detailAddr = addr + ' 맛집';
        var detailAddr = '서울특별시 중구 퇴계로 197';
    
        ps.keywordSearch(detailAddr, placesSearchCB);
    
        function placesSearchCB(data, status, pagination){
            if(status === kakao.maps.services.Status.OK){

                console.log(data);
                address_duplicate(data);
                
            } else if(status === kakao.maps.services.status.ERROR){
    
                alert('오류 발생');
                return;
    
            } else if(status === kakao.maps.services.status.ZERO_RESULT){
    
                alert('검색결과가 존재하지 않습니다');
                return;
    
            }
        }*/
        /*
        function address_duplicate(data){
    
            var search_tmp = [];
    
            for(var i=0; i<data.length; i++){
                var tmp = data[i].road_address_name;
                var tmp1 = tmp.indexOf('로');
                var tmp2 = tmp.indexOf(' ');
                var tmp3 = tmp.slice(tmp2+1, tmp1+1);
                search_tmp.push(tmp3);
            }
    
            let search = [...new Set(search_tmp)];

            setPlaces(search);
        }
        
        if(addr!==""){
            setLoading(false);
        }*/

    }, [latitude, longtitude, addr, print]);

    return(
        <>
        {
            loading ? <Loading /> :
            <FindGpsApi addr={addr} print={print}/>
        }
        </>
    );
    
}

export default FindGps;