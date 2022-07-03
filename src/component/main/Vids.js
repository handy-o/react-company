import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Vids() {
    const { youtube } = useSelector((store) => store.youtubeReducer)
    const cursor = useRef(null);
    const frame = useRef(null);
    let isCursor = false;
    const mouseMove = e => {
        if (!isCursor) return cursor.current.style.display = 'none';

        cursor.current.style.left = e.clientX + 'px';
        cursor.current.style.top = e.clientY + 'px';
    }
    useEffect(() => {
        window.addEventListener('mousemove', mouseMove);
        frame.current.addEventListener('mouseenter', () => {
            isCursor = true;
            cursor.current.style.display = 'block';
        })
        frame.current.addEventListener('mouseleave', () => {
            isCursor = false;
            cursor.current.style.display = 'none';
        })
        return () => window.removeEventListener('mousemove', mouseMove);
    }, [])
    return (
        <section id="vids" className="myScroll" ref={frame}>
            <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                loop={true} // 처음-끝 반복
                spaceBetween={50} // 슬라이드 간 간격
                slidesPerView={3} // 한번에 보여지는 슬라이드 개수
                centeredSlides={true} // 센터모드
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
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
                {youtube.map((vid, idx) => {
                    if (idx > 5) return;
                    return (
                        <SwiperSlide key={vid.id}>
                            <div className="inner"
                                onMouseEnter={() => cursor.current.style = 'transform: translate(-50%, -50%) scale(3)'}
                                onMouseLeave={() => cursor.current.style = 'transform: translate(-50%, -50%) scale(1)'}>
                                {/* {idx + 1} */}
                                <div className="pic">
                                    <img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            {/* {youtube.map((vid, idx) => {
                <img key={idx} src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
            })} */}
            <div className="cursor" ref={cursor}></div>
        </section>
    )
}

export default Vids