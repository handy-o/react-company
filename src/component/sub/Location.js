import Layout from "../common/Layout"
import { useEffect, useRef, useState } from 'react'

function Location() {
    const { kakao } = window;
    const path = process.env.PUBLIC_URL;

    // 지도 정보값을 json형식으로 패키징해서 state에 옮겨담음
    const info = [
        {
            title: "삼성동 코엑스",
            latLng: new kakao.maps.LatLng(
                37.51269649256761,
                127.06066306108244
            ),
            imgSrc: `${path}/img/marker1.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) }
        },
        {
            title: "한강 달빛광장",
            latLng: new kakao.maps.LatLng(
                37.511428115136866,
                126.99762475590865
            ),
            imgSrc: `${path}/img/marker2.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) }
        },
        {
            title: "남산 서울타워",
            latLng: new kakao.maps.LatLng(
                37.55163472656687,
                126.98814003620416
            ),
            imgSrc: `${path}/img/marker3.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(116, 99) }
        }
    ]
    const [Info] = useState(info) // 위 정보를 Info에 담음

    const [Location, setLocation] = useState(null);
    const [Traffic, setTraffic] = useState(false); // 버튼 토글 기능으로 변경
    const [Index, setIndex] = useState(0);

    const container = useRef(null);
    const options = {
        center: Info[Index].latLng,
        level: 3
    }


    useEffect(() => {
        // 지도 안쪽 내용을 지워버린 후 새롭게 로드
        container.current.innerHTML = '';
        //지도 생성 및 객체 리턴
        const map_instance = new kakao.maps.Map(
            container.current,
            options
        );

        //info
        const markerPosition = Info[Index].latLng;
        const imageSrc = Info[Index].imgSrc;
        const imageSize = Info[Index].imgSize;
        const imageOption = Info[Index].imgPos;
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

        // 마커를 가운데에 위치시키기
        const mapCenter = () => {
            console.log('함수호출');
            map_instance.setCenter(Info[Index].latLng);
        }
        window.addEventListener('resize', mapCenter);
        return () => window.removeEventListener('resize', mapCenter);

    }, [Index]);

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

            <div className="btnSet">
                <button onClick={() => setTraffic(!Traffic)}>
                    {Traffic ? 'Traffic OFF' : 'Traffic ON'}
                </button>

                <ul>
                    {Info.map((info, idx) => {
                        let on = '';
                        idx === Index ? (on = 'on') : (on = '');
                        return (
                            <li
                                className={on}
                                key={idx}
                                onClick={() => setIndex(idx)}>
                                {info.title}
                            </li>
                        )
                    })}
                </ul>
            </div>


        </Layout >
    )
}

export default Location