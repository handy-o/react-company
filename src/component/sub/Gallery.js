import axios from 'axios'
import Layout from "../common/Layout"
import { useEffect, useState, useRef } from 'react'
import Masonry from 'react-masonry-component'

function Gallery() {
    const frame = useRef(null);
    const input = useRef(null);
    const [Items, setItems] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [EnableClick, setEnableClick] = useState(false)
    const masonryOption = {
        transitionDuration: '0.5s',
    }

    const getFlickr = async (opt) => {
        const key = '418715e184dbd270f5ea19ff1fa3672f';
        const method_interest = 'flickr.interestingness.getList';
        const method_search = 'flickr.photos.search';
        const method_user = 'flickr.people.getPhotos';
        let url = '';
        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&format=json&nojsoncallback=1`;
        }
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&tags=${opt.tags}&format=json&nojsoncallback=1`;
        }
        if (opt.type === 'user')
            url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${key}&per_page=${opt.count}&user_id=${opt.user}&format=json&nojsoncallback=1`;

        await axios.get(url).then(json => {
            console.log(json.data.photos.photo);
            if (json.data.photos.photo.length === 0) return alert('검색하신 결과값이 없습니다.')
            setItems(json.data.photos.photo)
        })
        setTimeout(() => {
            frame.current.classList.add('on');
            setLoading(false);
            setEnableClick(true);
        }, 1000)

    }

    const showInterest = () => {
        if (!EnableClick) return;
        setLoading(true);
        frame.current.classList.remove('on');
        getFlickr({ type: 'interest', count: 50 });
        setEnableClick(false);
    }
    const showSearch = (e) => {
        const result = input.current.value.trim(); // trim(스페이스만 넣었을 때까지)
        if (!result) {
            return alert('검색어를 입력하새요!')
        }
        if (!EnableClick) return;
        setEnableClick(false);
        setLoading(true);
        frame.current.classList.remove('on');

        getFlickr({
            type: 'search',
            count: 50,
            tags: result    // 검색어 넣기
        });

        // 인풋문자열 초기화
        input.current.value = '';
    }

    //처음 로드 시 사용
    useEffect(() => {
        getFlickr({ type: 'user', count: 50, user: '195938691@N04', })
    }, []);

    return (
        <Layout name={'Gallery'}>
            <button onClick={showInterest}>Interest Gallery</button>

            {/* 검색 */}
            <div className="searchBox">
                <input type="text" ref={input} onKeyUp={e => {
                    if (e.key === 'Enter') { // console.log찍어보면 key와 keyCode 값을 알 수 있음
                        showSearch();
                    }
                }} />
                <button onClick={showSearch}>Search</button>
            </div>
            {/* 
            키보드를 눌렀을 때
            keyDown : 누르는 순간
            keyUp : 눌렀다가 떼는 순간 (* 실무에서 가장 많이 씀)
            keyPress : 영문키보드에 최적화되어 한글/특수문자같은 것 인식이 안되는 문제
            */}

            {/* 로딩이미지 */}
            {Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} />}

            <article ref={frame}>
                <Masonry elementType={'ul'} options={masonryOption}>
                    {Items.map((item) => {
                        return (
                            <li key={item.id}>
                                <div className="inner">
                                    <div className="pic">
                                        <img src={`https://live.staticflickr.com/${item.server
                                            }/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
                                    </div>
                                    <h2>{item.title}</h2>
                                    <div className="profile">
                                        <img
                                            src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
                                            alt={item.owner}
                                            onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')} />
                                        <span
                                            onClick={(e) => {
                                                if (!EnableClick) return;
                                                setEnableClick(false);
                                                frame.current.classList.remove('on');
                                                getFlickr({
                                                    type: 'user',
                                                    count: 50,
                                                    user: e.target.innerText,
                                                });
                                            }}
                                        >{item.owner}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </Masonry>
            </article>
        </Layout>
    )
}

export default Gallery