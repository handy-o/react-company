import Layout from "../common/Layout"
import { useEffect, useState } from 'react'
import axios from "axios";

function Youtube() {
    const [vids, setVids] = useState([]);
    const key = 'AIzaSyD4taSlH00Ul7_XuoRrweLcAZNS-gn080Q';
    const playlist = 'PLcFzhbItLOvYk5e0s4C2eFiO1iiC7hw-Y';
    const num = 5;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

    useEffect(() => {
        axios.get(url).then((json) => {
            console.log(json.data.items);
            setVids(json.data.items)
        })
    }, [])

    return (
        <Layout name={'Youtube'}>
            {
                vids.map((vid, idx) => {

                    return (
                        <article key={idx}>
                            <h2>{vid.snippet.title}</h2>
                            <div className="txt">
                                <p>{vid.snippet.description}</p>
                                <span>{vid.snippet.publishedAt}</span>
                            </div>
                            <div className="pic">
                                <img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
                            </div>

                        </article>
                    )
                })
            }
        </Layout>
    )
}

export default Youtube