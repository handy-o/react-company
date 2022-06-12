import { useState, useEffect } from 'react';

function News() {
    // 미션 - 
    // 메인의 NEWS 컴포넌트에 커뮤니티 페이지에 있는
    // 최근 게시글 4개를 이곳에 출력

    const getLocalData = () => {
        const data = localStorage.getItem('post');
        return JSON.parse(data);
    }


    const [Posts] = useState(getLocalData); // 보여주기만 할거라 setPosts는 사용x

    useEffect(() => {

    }, [])

    return (
        <section id="news">
            {Posts.map((post, idx) => {
                if (idx < 4) {
                    return (
                        <article key={idx}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </article>
                    )
                }
            })}
        </section>
    )
}

export default News