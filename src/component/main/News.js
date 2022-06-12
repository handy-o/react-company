import { useState, useEffect } from 'react';

function News() {
    // 미션 - 
    // 메인의 NEWS 컴포넌트에 커뮤니티 페이지에 있는
    // 최근 게시글 4개를 이곳에 출력

    const getLocalData = () => {
        // if 처음 접속해서 데이터가 없을 경우 더미데이터를 출력
        const dummyPosts = [
            { title: 'Hello5', content: 'Hero comes description in detail' },
            { title: 'Hello4', content: 'Hero comes description in detail' },
            { title: 'Hello3', content: 'Hero comes description in detail' },
            { title: 'Hello2', content: 'Hero comes description in detail' },
            { title: 'Hello1', content: 'Hero comes description in detail' },
        ]
        const data = localStorage.getItem('post');

        if (data) { // 데이터가 있으면
            return JSON.parse(data); // 로컬스토리지에 데이터
        } else {
            return dummyPosts // 더미 데이터
        }

    }

    const [Posts] = useState(getLocalData); // 보여주기만 할거라 setPosts는 사용x

    useEffect(() => {
        localStorage.setItem('post', JSON.stringify(Posts))
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