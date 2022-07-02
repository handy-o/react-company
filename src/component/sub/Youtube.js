import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';

import Popup from '../common/Popup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Youtube() {
    const Vids = useSelector((store) => store.youtubeReducer.youtube); //처음에 빈배열담김
    const pop = useRef(null);
    const [Index, setIndex] = useState(0); // 유튜브 순서

    // 팝업
    const handlePopup = (index) => {
        setIndex(index);
        pop.current.open();
    }

    const history = useHistory();
    useEffect(() => {
        const backEvt = () => {
            console.log('back');
        };

        const funcBack = history.listen(({ action }) => {
            console.log(action);
            if (action === 'POP') backEvt();
        });

        return funcBack;
    }, [history]);

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