import Layout from "../common/Layout"
import { useEffect, useRef, useState } from 'react'

function Location() {
    const { kakao } = window;
    const path = process.env.PUBLIC_URL;

    // 지도 정보값을 json형식으로 패키징해서 state에 옮겨담음
    const info = [
        {
            title: "삼성동 코엑스",
            latlng: new kakao.maps.LatLng(
                37.51269649256761,
                127.06066306108244
            ),
            imgSrc: `${path}/img/marker1.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imagPos: { offset: new kakao.maps.Point(116, 99) }
        },
        {
            title: "달빛광장",
            latlng: new kakao.maps.LatLng(
                37.511507,
                126.997067
            ),
            imgSrc: `${path}/img/marker2.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imagPos: { offset: new kakao.maps.Point(116, 99) }
        },
        {
            title: "남산",
            latlng: new kakao.maps.LatLng(
                37.551776,
                127.988169
            ),
            imgSrc: `${path}/img/marker3.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imagPos: { offset: new kakao.maps.Point(116, 99) }
        }
    ]
    const [Info, setInfo] = useState(info) // 위 정보를 Info에 담음

    const [Location, setLocation] = useState(null);
    const [Traffic, setTraffic] = useState(false); // 버튼 토글 기능으로 변경
    const container = useRef(null);
    const options = {
        center: info[0].latlng,
        level: 3
    }


    useEffect(() => {
        //지도 생성 및 객체 리턴
        const map_instance = new kakao.maps.Map(
            container.current,
            options
        );

        //info
        const markerPosition = info[0].latlng;
        const imageSrc = info[0].imgSrc;
        const imageSize = info[0].imgSize;
        const imageOption = info[0].imageOption;
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc, imageSize, imageOption
        );
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage
        });

        // 마커 인스턴스로부터 setMap함수 호출
        marker.setMap(map_instance);
        setLocation(map_instance);
    }, []);

    useEffect(() => {
        if (Location) {
            Traffic ?
                Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                :
                Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
        }

    }, [Traffic])

    return (
        <Layout name={'Location'}>
            <div id="map" ref={container}></div>


            <button onClick={() => setTraffic(!Traffic)}>
                {Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
        </Layout >
    )
}

export default Location