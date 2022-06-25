import axios from 'axios'
import Layout from "../common/Layout"
import { useEffect, useState, useRef } from 'react'

function Gallery() {
    const key = '418715e184dbd270f5ea19ff1fa3672f';
    const method_interest = 'flickr.interestingness.getList';
    const num = 50;
    //https://www.flickr.com/services/api/request.rest.html
    const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${num}&format=json&nojsoncallback=1`;
    const frame = useRef(null);
    const [Items, setItems] = useState([]);

    const getFlickr = async () => {
        await axios.get(url).then(json => {
            console.log(json.data.photos.photo);
            setItems(json.data.photos.photo)
        })
        frame.current.classList.add('on')
    }
    useEffect(getFlickr, []); //함수라서 arrow다시 랩핑 안해도 됨

    // per.page  몇개
    return (
        <Layout name={'Gallery'}>
            <button>Interest Gallery</button>
            <button>Search Gallery</button>
            <ul ref={frame}>
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
            </ul>
        </Layout>
    )
}

export default Gallery