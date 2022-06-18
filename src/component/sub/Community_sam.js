import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
    const input = useRef(null);
    const textarea = useRef(null);
    const inputEdit = useRef(null);
    const textareaEdit = useRef(null);

    const getLocalData = () => {
        const data = localStorage.getItem('post');
        return JSON.parse(data);
    };
    const [Posts, setPosts] = useState(getLocalData());
    const [Allowed, setAllowed] = useState(true);

    const resetPost = () => {
        input.current.value = '';
        textarea.current.value = '';
        if (inputEdit.current) {
            inputEdit.current.value = '';
            textareaEdit.current.value = '';
        }
    };

    const createPost = () => {
        if (
            input.current.value.trim() === '' ||
            textarea.current.value.trim() === ''
        ) {
            resetPost();
            return alert('제목과 본문을 입력하세요');
        }
        setPosts([
            { title: input.current.value, content: textarea.current.value },
            ...Posts,
        ]);

        resetPost();
    };

    const deletePost = (index) => {
        if (!window.confirm('정말 삭제하시겠습니까')) return;
        setPosts(Posts.filter((_, idx) => idx !== index));
    };

    //게시글 수정함수
    const updatePost = (index) => {
        if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
            resetPost();
            return alert('수정할 제목과 본문을 모두 입력하세요.');
        }

        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) {
                    post.title = inputEdit.current.value;
                    post.content = textareaEdit.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })
        );
    };

    //게시글을 수정모드로 변경하는 함수정의
    const enableUpdate = (index) => {
        if (!Allowed) return;
        setAllowed(false);
        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = true;
                return post;
            })
        );
    };

    //게시글을 다시 출력모드로 변경하는 함수 정의
    const disableUpdate = (index) => {
        setAllowed(true);
        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        );
    };

    useEffect(() => {
        console.log(Posts);
        localStorage.setItem('post', JSON.stringify(Posts));
    }, [Posts]);

    return (
        <Layout name={'Community'}>
            <div className='inputBox'>
                <input type='text' placeholder='제목을 입력하세요' ref={input} />
                <br />
                <textarea
                    cols='30'
                    rows='5'
                    placeholder='본문을 입력하세요'
                    ref={textarea}></textarea>
                <br />

                <div className='btnSet'>
                    <button onClick={resetPost}>CANCEL</button>
                    <button onClick={createPost}>WRITE</button>
                </div>
            </div>

            <div className='showBox'>
                {Posts.map((post, idx) => {
                    return (
                        <article key={idx}>
                            {post.enableUpdate ? (
                                //수정 모드 UI
                                <>
                                    <div className='txt'>
                                        <input
                                            type='text'
                                            defaultValue={post.title}
                                            ref={inputEdit}
                                        />
                                        <br />
                                        <textarea
                                            cols='30'
                                            rows='5'
                                            ref={textareaEdit}
                                            defaultValue={post.content}></textarea>
                                    </div>

                                    <div className='btnSet'>
                                        <button onClick={() => disableUpdate(idx)}>CANCEL</button>
                                        <button onClick={() => updatePost(idx)}>SAVE</button>
                                    </div>
                                </>
                            ) : (
                                //출력모드 UI
                                <>
                                    <div className='txt'>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>
                                    </div>

                                    <div className='btnSet'>
                                        <button onClick={() => enableUpdate(idx)}>EDIT</button>
                                        <button onClick={() => deletePost(idx)}>DELETE</button>
                                    </div>
                                </>
                            )}
                        </article>
                    );
                })}
            </div>
        </Layout>
    );
}

export default Community;