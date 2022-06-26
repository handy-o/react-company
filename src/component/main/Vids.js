import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { useRef, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Vids() {
    const cursor = useRef(null);
    const mouseMove = e => {
        cursor.current.style.left = e.clientX + 'px';
        cursor.current.style.top = e.clientY + 'px';
    }
    useEffect(() => {
        window.addEventListener('mousemove', mouseMove);
        return () => window.removeEventListener('mousemove', mouseMove);
    }, [])
    return (
        <section id="vids" className="myScroll">
            <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                loop={true} // 처음-끝 반복
                spaceBetween={50} // 슬라이드 간 간격
                slidesPerView={3} // 한번에 보여지는 슬라이드 개수
                centeredSlides={true} // 센터모드
                breakpoints={{
                    500: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}>
                {[0, 1, 2, 3, 4, 5].map(num => {
                    return (
                        <SwiperSlide key={num}>
                            <div className="inner"
                                onMouseEnter={() => cursor.current.style = 'transform: translate(-50%, -50%) scale(3)'}
                                onMouseLeave={() => cursor.current.style = 'transform: translate(-50%, -50%) scale(1)'}>
                                {num + 1}
                            </div>
                        </SwiperSlide>
                    )
                })}
                {/* <SwiperSlide>
                    <div className="inner">1</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="inner">2</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="inner">3</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="inner">4</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="inner">5</div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="inner">6</div>
                </SwiperSlide> */}
                {/* <SwiperSlide>1</SwiperSlide>
                <SwiperSlide>2</SwiperSlide>
                <SwiperSlide>3</SwiperSlide>
                <SwiperSlide>4</SwiperSlide>
                <SwiperSlide>5</SwiperSlide>
                <SwiperSlide>6</SwiperSlide> */}
            </Swiper>
            <div className="cursor" ref={cursor}></div>
        </section>
    )
}

export default Vids