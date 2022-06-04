import Layout from "../common/Layout"
import { useEffect, useRef } from 'react'

function Location() {
    // window 전역객체에서 kakao라는 이름의 객체를 비구조화 할당으로 직접 변수에 전달
    const { kakao } = window;
    const path = process.env.PUBLIC_URL;
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
    }, []);

    return (
        <Layout name={'Location'}>
            <div id="map" ref={container}></div> {/* ㅇ참조 */}
        </Layout>
    )
}

export default Location