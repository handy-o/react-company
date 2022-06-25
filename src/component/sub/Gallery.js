import axios from 'axios'
import Layout from "../common/Layout"
import { useEffect, useState } from 'react'

function Gallery() {
    const key = '4612601b324a2fe5a1f5f7402bf8d87a';
    const method_interest = 'flickr.interestingness.getList';
    const num = 50;

    //https://www.flickr.com/services/api/request.rest.html
    const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${num}&format=json&nojsoncallback=1`

    const [Items, setItems] = useState([]);
    useEffect(() => {
        axios.get(url).then(json => {
            console.log(json.data.photos.photo);
            setItems(json.data.photos.photo)
        })
    }, []);

    // per.page  몇개
    return (
        <Layout name={'Gallery'}>
            <h1>Gallery</h1>
        </Layout>
    )
}

export default Gallery