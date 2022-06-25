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
        const method_search = 'flickr.photos.search'
        let url = '';
        if (opt.type === 'interest') {
            url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&format=json&nojsoncallback=1`;
        }
        if (opt.type === 'search') {
            url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&tags=${opt.tags}&format=json&nojsoncallback=1`;
        }

        await axios.get(url).then(json => {
            console.log(json.data.photos.photo);
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

    useEffect(() => {
        getFlickr({ type: 'interest', count: 50 })
    }, []);

    return (
        <Layout name={'Gallery'}>
            <button onClick={showInterest}>Interest Gallery</button>

            {/* 검색 */}
            <div className="searchBox">
                <input type="text" ref={input} />
                <button onClick={showSearch}>Search</button>
            </div>

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