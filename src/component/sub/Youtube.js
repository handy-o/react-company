import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // 비동기로 정보 가져옴
import Popup from '../common/Popup';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/action';

function Youtube() {
    const dispatch = useDispatch();
    const Vids = useSelector((store) => store.youtubeReducer.youtube); //처음에 빈배열담김
    const pop = useRef(null);

    const [Index, setIndex] = useState(0); // 유튜브 순서

    const fetchYoutube = async () => {
        const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
        const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
        const num = 8;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

        await axios.get(url).then((json) => {
            dispatch(setYoutube(json.data.items));
            // {type: 'SET_YOUTUBE', payload: json.data.items}
        });
    };
    useEffect(fetchYoutube, [])

    // 팝업
    const handlePopup = (index) => {
        setIndex(index);
        pop.current.open();
    }

    return (
        <>
            <Layout name={'Youtube'}>
                {
                    Vids.map((vid, idx) => {
                        // 글자수 자르기
                        const tit = vid.snippet.title;
                        const desc = vid.snippet.description;

                        // 구분자로 자르기
                        const date = vid.snippet.publishedAt;

                        return (
                            <article key={idx}>
                                <h2>{tit.length > 20 ? tit.substr(0, 20) + '...' : tit}</h2>
                                <div className="txt">
                                    <p>{desc.length > 100 ? desc.substr(0, 200) + '...' : desc}</p>
                                    <span>{date.split('T')[0]}</span>
                                    {/* T를 기점으로 배열로 자름 */}
                                </div>
                                <div className="pic" onClick={() => handlePopup(idx)}>
                                    <img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
                                </div>

                            </article>
                        )
                    })
                }
            </Layout>

            {/* common > popup.js에서 수정되었기 때문에 3항 사용 x */}
            <Popup ref={pop}>
                {Vids.length !== 0 && (
                    <iframe
                        src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
                        frameborder="0">
                    </iframe>
                )}
            </Popup>


        </>
    )
}

export default Youtube