import Layout from "../common/Layout"
import { useEffect, useRef } from 'react'

function Location() {
    // window 전역객체에서 kakao라는 이름의 객체를 비구조화 할당으로 직접 변수에 전달
    const { kakao } = window;
    const container = useRef(null); // ㅇ등록 (지도를 담을 영역의 DOM 레퍼런스)
    const options = { //지도를 생성할 때 필요한 기본 옵션
        //center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        center: new kakao.maps.LatLng(37.51269649256761, 127.06066306108244), //https://apis.map.kakao.com/web/sample/addMapClickEventWithMarker/
        level: 3 //지도의 레벨(확대, 축소 정도)
    }

    useEffect(() => {
        //지도 생성 및 객체 리턴
        const map_instance = new kakao.maps.Map(container.current, options);

        // 마커가 표시될 위치
        const markerPosition = new kakao.maps.LatLng(37.51269649256761, 127.06066306108244);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커 인스턴스로부터 setMap함수 호출 (인수로 지도 인스턴스 전달)
        marker.setMap(map_instance);
    }, []);

    return (
        <Layout name={'Location'}>
            <div id="map" ref={container}></div> {/* ㅇ참조 */}
        </Layout>
    )
}

export default Location