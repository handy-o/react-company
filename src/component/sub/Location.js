import Layout from "../common/Layout"
import { useEffect, useRef, useState } from 'react'

function Location() {
    const [Location, setLocation] = useState(null);
    const { kakao } = window;
    const path = process.env.PUBLIC_URL;
    const container = useRef(null);
    const options = {
        center: new kakao.maps.LatLng(37.51269649256761, 127.06066306108244), //https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
        level: 3
    }

    // 버튼 토글 기능으로 변경
    const [Traffic, setTraffic] = useState(false);
    useEffect(() => {
        if (Location) { // 첫 로드시에 Location 값이 아직 null이므로 if문 추가
            Traffic ?
                Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                :
                Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        }

    }, [Traffic])

    useEffect(() => {
        //지도 생성 및 객체 리턴
        const map_instance = new kakao.maps.Map(container.current, options);

        // 마커가 표시될 위치
        const markerPosition = new kakao.maps.LatLng(37.51269649256761, 127.06066306108244);

        // 마커 이미지 인스턴스 생성
        const imageSrc = `${path}/img/marker1.png`;
        const imageSize = new kakao.maps.Size(232, 99); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(116, 99) }; // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc, imageSize, imageOption
        );

        // 마커를 생성
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        // 마커 인스턴스로부터 setMap함수 호출 (인수로 지도 인스턴스 전달)
        marker.setMap(map_instance);
        setLocation(map_instance);
    }, []);

    return (
        <Layout name={'Location'}>
            <div id="map" ref={container}></div> {/* ㅇ참조 */}
            {/* <button onClick={() => {
                Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>Traffic On</button>
            <button onClick={() => {
                Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
            }}>Traffic Off</button> */}

            <button onClick={() => setTraffic(!Traffic)}>
                {Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
        </Layout >
    )
}

export default Location