import Layout from "../common/Layout"
import { useEffect, useState } from 'react'
import axios from "axios"; // 비동기로 정보 가져옴
import Popup from "../common/Popup";

function Youtube() {
    const [Vids, setVids] = useState([]);
    const [Open, setOpen] = useState(false); // 팝업
    const [Index, setIndex] = useState(0); // 유튜브 순서

    const FetchYoutube = () => {
        const key = 'AIzaSyD4taSlH00Ul7_XuoRrweLcAZNS-gn080Q';
        const playlist = 'PLcFzhbItLOvYk5e0s4C2eFiO1iiC7hw-Y';
        const num = 5;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

        axios.get(url).then((json) => {
            console.log(json.data.items);
            setVids(json.data.items)
        });
    }
    useEffect(FetchYoutube, [])

    // 팝업
    const handlePopup = (index) => {
        setOpen(true);
        setIndex(index)
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

            {/* {Open ? <Popup setOpen={setOpen} /> : null} 아래와 동일 */}
            {Open && (
                <Popup setOpen={setOpen}>
                    <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameborder="0"></iframe>
                </Popup>
            )}

        </>
    )
}

export default Youtube