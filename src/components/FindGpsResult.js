import React, {useEffect} from "react";
import { useState } from "react";
import '../css/FindGpsResult.css';

const {kakao} = window;

const FindGpsResult = ({data}) => {

    const [latitude, setLatitude] = useState(null);
    const [longtitude, setLongtitude] = useState(null);

    useEffect(() => {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
    
                var locPosition = new kakao.maps.LatLng(lat,lon),
                    message = `<span style="display: block;background: #50627F;color: #fff;text-align: center;width:130px;height: 24px;line-height:22px;border-radius:4px;padding:0px 10px;">현재 위치</span>`;
    
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

        // 주소-좌표 객체 생성
        var geocoder = new kakao.maps.services.Geocoder();

        // data = open api search data
        for(var k=0;k<data.length;k++){

            var keyplace = data[k].props.place;
            var keyvalue = data[k].key;
            var keygrade = data[k].props.value;

            var callback = function(result, status){
                if(status === kakao.maps.services.Status.OK){

                    // 좌표(위도, 경도), 장소이름(openapi), 장소 ID(openapi key), 도로명 주소(openapi), 지번 주소(openapi), 위생등급
                    displayMarker(result[0].y, result[0].x, keyplace, keyvalue, result[0].address.address_name, result[0].road_address.address_name, keygrade);
                }
            }
            
            geocoder.addressSearch(data[k].props.address, callback);

        }

        function displayMarker(placey, placex, place, place_key, place_ad, place_road, place_grade){
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(placey, placex)
            });
            //console.log(place_grade);
            displayOverlay(marker, place, place_key, place_ad, place_road, place_grade);
        }

        // marker, place info, place key, address, road_address, grade
        function displayOverlay(marker, place, place_key, place_ad, place_road, place_grade){

            let overlay;
            let content = `<div class="wrap" style="position: absolute;left: 0;bottom: 40px;width: 288px;height: 150px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;">
                               <div class="info" style="width: 286px;height: 140px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;">
                                   <div class="title" style="padding: 5px 0 0 10px;height: 50px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;">
                                   <div>${place}</div>
                                    <div style="float:right;margin:5px 10px 0 0;font-size:12px;font-color:red;">위생등급:  ${place_grade}</div>
                                   </div>
                                   <div class="body" style="position: relative;overflow: hidden;">
                                       <div class="img" style="position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;">
                                           <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70" />
                                       </div>
                                       <div class="desc" style="position: relative;margin: 13px 0 0 90px;height: 75px;">
                                            <div class="ellipsis" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">주소)${place_road}</div>
                                            <div class="jibun" style="font-size: 11px;color: #888;margin-top: -2px;">지번)${place_ad}</div>
                                            <button type="button" onClick="window.location.href = 'http://localhost:3000/findPeopleWith/${place}/${place_road}/${place_grade}/${place_key}'" style="margin:5px 0px 0px 10px;height:25px;width:150px;">같이 먹을사람 찾기</button>
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