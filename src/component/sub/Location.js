import Layout from "../common/Layout"
import { useEffect, useRef } from 'react'

function Location() {
    // window 전역객체에서 kakao라는 이름의 객체를 비구조화 할당으로 직접 변수에 전달
    const { kakao } = window;
    const container = useRef(null); // ㅇ등록 (지도를 담을 영역의 DOM 레퍼런스)
    const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
    }

    useEffect(() => {
        //지도 생성 및 객체 리턴
        new kakao.maps.Map(container.current, options);
    }, []);

    return (
        <Layout name={'Location'}>
            <div id="map" ref={container}></div> {/* ㅇ참조 */}
        </Layout>
    )
}

export default Location