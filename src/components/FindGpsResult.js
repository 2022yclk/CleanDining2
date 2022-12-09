import React, {useEffect} from "react";
import { useState } from "react";
import '../css/FindGpsResult.css';

const {kakao} = window;

const FindGpsResult = ({data1, data2}) => {

    //console.log(data2);

    const [latitude, setLatitude] = useState(null);
    const [longtitude, setLongtitude] = useState(null);
    //const [place, setPlace] = useState("");
    //const [key, setKey] = useState("");
    //const [grade, setGrade] = useState("");

    useEffect(() => {

        // 현위치 받아오기
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
    
                var locPosition = new kakao.maps.LatLng(lat,lon),
                    message = `<span style="display: block;background: #50627F;color: #fff;text-align: center;width:150px;height: 24px;line-height:22px;border-radius:4px;padding:0px 10px;">현재 위치</span>`;
    
                setLatitude(lat);
                setLongtitude(lon);
    
                displayGpsMarker(locPosition, message); // 마커
            });
        } else {

            // gps 허용이 안될때, 기본주소 충무로
            var locPosition = new kakao.maps.LatLng(37.557523, 126.998186), 
                message = '<div style="padding:5px;">geolocation을 사용할 수 없어요..</div>';
    
            displayGpsMarker(locPosition, message);
        }

        // 지도 표시
        const container = document.getElementById('Map');
        const options = {
            center: new kakao.maps.LatLng(latitude, longtitude),
            level: 4
        };

        const map = new kakao.maps.Map(container, options);

        // 우측 상단에 map control 추가
        var mapTypeControl = new kakao.maps.MapTypeControl();
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        function displayGpsMarker(locPosition, message){
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition
            });
    
            var iwContent = message,
                iwRemovaeable = false;
    
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable : iwRemovaeable
            });
    
            infowindow.open(map, marker);
    
            map.setCenter(locPosition);
        } 

        const ps = new kakao.maps.services.Places();
    
        //var detailAddr = addr + ' 맛집';
        for(var k=0;k<data2.length;k++){
            
            console.log(data1);

            var detailAddr = data2[k]; // ex) 서울특별시 중구 퇴계로 197
            var detailTmp = data1.C004.row[k];
            console.log(detailTmp);
            var detailPlace = detailTmp.BSSH_NM;
            console.log(detailPlace);
            var detailKey = detailTmp.WRKR_REG_NO;
            console.log(detailKey);
        
            var searchOption1 = {
                page: 2
            };
    
            var searchOption2 = {
                page: 3
            }
    
            ps.keywordSearch(detailAddr, placesSearchCB);
            ps.keywordSearch(detailAddr, placesSearchCB, searchOption1);
            ps.keywordSearch(detailAddr, placesSearchCB, searchOption2);
    
        
            function placesSearchCB(data, status, pagination){
                if(status === kakao.maps.services.Status.OK){

                    for(var j=0;j<data.length;j++){

                        // 카카오맵에서 음식점 상세정보 페이지에서 보여줄 거
                        //console.log(data[j].place_name);
                        //console.log(data[j].address_name);
                        //console.log(data[j].phone);
                        //console.log(data[j].category_name);

                        var tmp = data[j].place_name;
                        var tmp1 = tmp.indexOf(' ');
                        var midTmp = tmp.slice(0,tmp1);

                        var count = 0;

                        for(var u=0;u<midTmp.length;u++){
                            if(detailPlace[u]===midTmp[u]){
                                count = count + 1;
                            }
                        }

                        //console.log(count);

                        
                        if((count/midTmp.length)>0.5){
                            //console.log(data1.C004.row[k].WRKR_REG_NO);
                            // place[x,y,place_name,address_name,phone,category_name] place key(open api), 
                            displayMarker(data[j], detailTmp);
                            
                        }

                    }
                    
                } else if(status === kakao.maps.services.status.ERROR){
        
                    alert('오류 발생');
                    return;
        
                } else if(status === kakao.maps.services.status.ZERO_RESULT){
        
                    alert('검색결과가 존재하지 않습니다');
                    return;
        
                }
            }
        }

        // 주소-좌표 객체 생성
        //var geocoder = new kakao.maps.services.Geocoder();

        // data = open api search data
        /*for(var k=0;k<data.length;k++){

            console.log('-----1----');

            var callback = function(result, status){
                if(status === kakao.maps.services.Status.OK){
                    //console.log(keyplace);
                    // 좌표(위도, 경도), 장소이름(openapi), 장소 ID(openapi key), 도로명 주소(openapi), 상세 주소(openapi), 위생등급
                    displayMarker(result[0].y, result[0].x, place, key, result[0].address.address_name, result[0].road_address.address_name, grade);
                }
            }

            setPlace(data[k].props.place);
            setKey(data[k].key);
            setGrade(data[k].props.value);
            
            geocoder.addressSearch(data[k].props.address, callback);

            console.log(place);
        }*/

        function displayMarker(place, openapi){
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });
            //console.log(place);
            displayOverlay(marker, place, openapi);
        }

        // marker, place info, place key(WRKR_REG_NO), address, grade(HS_ASGN_LV), place_road(ADDR), phone, category_name
        function displayOverlay(marker, place, openapi){

            console.log(openapi);

            let overlay;
            //console.log(place);
            let content = `<div class="wrap" style="position: absolute;left: 0;bottom: 40px;width: 288px;height: 150px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;">
                               <div class="info" style="width: 286px;height: 140px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;">
                                    <div class="title" style="height: 50px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;">
                                        <div style="margin:10px 0 0 15px;">${place.place_name}</div>
                                    </div>
                                    <div class="body" style="position: relative;overflow: hidden;">
                                        <div class="desc" style="position: relative;margin: 10px;height: 100px;">
                                            <div class="ellipsis" style="font-size:13px;width:170px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">주소)${place.address_name}</div>
                                            <button type="button" onClick="window.location.href = 'http://localhost:3000/findPeopleWith/${place.place_name}/${openapi.WRKR_REG_NO}/${place.address_name}/${openapi.ADDR}/${openapi.HG_ASGN_LV}/${place.phone}/${place.category_name}'" style="margin:15px 0px 0px 5px;height:25px;width:150px;">같이 먹을사람 찾기</button>
                                        </div>
                                        <div style="float:right;margin:15px 10px 00 ;font-size:12px;font-color:red;text-align:center">
                                            위생등급 <br /> 
                                            <h2 style="color:red;">${openapi.HG_ASGN_LV}</h2>
                                        </div>
                                    </div>
                               </div>
                            </div>`;

            // 마커 클릭하면 음식점 세부정보 오버레이 생성
            kakao.maps.event.addListener(marker, 'click', function(){
                overlay = new kakao.maps.CustomOverlay({
                    content: content,
                    map: map,
                    position: marker.getPosition()
                });
            });

            // 마커에서 마우스오버하면 세부정보 오버레이 없어짐
            kakao.maps.event.addListener(marker, 'mouseover', function(){
                overlay.setMap(null);
            });
        }

    }, [latitude, longtitude]);

    return(
        <div>
            <div id="Map" class="Map"></div>
        </div>
    );
}

export default FindGpsResult;