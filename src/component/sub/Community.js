import Layout from "../common/Layout"
import { useRef, useState, useEffect } from 'react'

function Community() {
    const input = useRef(null);
    const textarea = useRef(null);


    //2)
    const dummyPosts = [
        { title: 'Hello5', content: 'Hero comes description in detail' },
        { title: 'Hello4', content: 'Hero comes description in detail' },
        { title: 'Hello3', content: 'Hero comes description in detail' },
        { title: 'Hello2', content: 'Hero comes description in detail' },
        { title: 'Hello1', content: 'Hero comes description in detail' },
    ]
    const [Posts, setPosts] = useState(dummyPosts);

    const resetPost = () => {
        // 빈값으로
        input.current.value = '';
        textarea.current.value = '';
    }

    const createPost = () => {
        if (input.current.value.trim() === '' || textarea.current.value.trim() === '') {
            resetPost();
            return alert('제목과 본문을 입력하세요')
        }
        setPosts([
            // 위순서
            { title: input.current.value, content: textarea.current.value },
            ...Posts,
            // 아래순서
            //{ title: input.current.value, content: textarea.current.value }
        ]);

        resetPost();
    }

    //3 ) 입력한 글 삭제 (배열에서 제외)
    const deletePost = () => {
        console.log(index);
        setPosts(Posts.filter((_, idx) => idx !== index))
    }

    useEffect(() => {
        console.log(Posts)
    }, [Posts])

    return (
        <Layout name={'Community'}>
            <div className="inputBox">
                <input type="text" placeholder="제목을 입력하세요" ref={input} />
                <br />
                <textarea
                    cols="30" rows="5"
                    placeholder='본문을 입력하세요'
                    ref={textarea}></textarea>

                <button onClick={resetPost}>CANCEL</button>
                <button onClick={createPost}>WRITE</button>
            </div>

            <div className="showBox">
                {Posts.map((post, idx) => {
                    return (
                        <article key={idx}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>

                            {/* 3) */}
                            <div className="btnSet">
                                <button>EDIT</button>
                                <button onClick={() => deletePost(idx)}>DELETE</button>
                            </div>
                        </article>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Community

// -crud-
// create
// read
// update
// delete