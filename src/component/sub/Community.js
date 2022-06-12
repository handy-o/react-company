import Layout from "../common/Layout"
import { useRef, useState, useEffect } from 'react'

function Community() {
    const input = useRef(null);
    const textarea = useRef(null);

    // 수정한 글 저장할 때 
    const inputEdit = useRef(null);
    const textareaEdit = useRef(null);

    const dummyPosts = [
        { title: 'Hello5', content: 'Hero comes description in detail' },
        { title: 'Hello4', content: 'Hero comes description in detail' },
        { title: 'Hello3', content: 'Hero comes description in detail' },
        { title: 'Hello2', content: 'Hero comes description in detail' },
        { title: 'Hello1', content: 'Hero comes description in detail' },
    ]
    const [Posts, setPosts] = useState(dummyPosts);
    // 중복 수정 모드 방지
    const [Allowed, setAllowed] = useState(true);

    const resetPost = () => {
        // 빈값으로
        input.current.value = '';
        textarea.current.value = '';
        // 수정중에 빈칸으로
        if (inputEdit.current) { // 수정누르기 전에 그냥 'Write' 버튼 클릭시에 resetPost가 실행되어 생기는 에러 방지
            inputEdit.current.value = '';
            textareaEdit.current.value = '';
        }

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
    const deletePost = (index) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setPosts(Posts.filter((_, idx) => idx !== index))
    }

    // 수정가능 모드로 변경시켜주는 함수
    const enableUpdate = index => {
        if (!Allowed) return;
        setAllowed(false);
        setPosts(
            Posts.map((post, idx) => {
                if (idx == index) post.enableUpdate = true;
                return post;
            })
        )
    }
    // 게시글을 다시 출력모드로 변경
    const disableUpdate = index => {
        setAllowed(true);
        setPosts(
            Posts.map((post, idx) => {
                if (idx == index) post.enableUpdate = false;
                return post;
            })
        )
    }

    // 수정한 글 저장
    const updatePost = index => {
        if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
            resetPost();
            return alert('수정할 제목과 본문을 모두 입력하세요.');
        }

        setPosts(
            Posts.map((post, idx) => {
                if (idx == index) {
                    post.title = inputEdit.current.value;
                    post.content = textareaEdit.current.value;
                    post.enableUpdate = false;
                }
                return post;
            })

        )
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

                <div className="btnSet">
                    <button onClick={resetPost}>CANCEL</button>
                    <button onClick={createPost}>WRITE</button>
                </div>
            </div>

            <div className="showBox">
                {Posts.map((post, idx) => {
                    return (
                        <article key={idx}>
                            {/*  분기처리  */}
                            {post.enableUpdate ?
                                // 수정모드 UI
                                (
                                    <>
                                        <div className="txt">
                                            <input type="text" defaultValue={post.title} ref={inputEdit} />
                                            <textarea cols="30" rows="5" defaultValue={post.content} ref={textareaEdit}></textarea>
                                        </div>
                                        <div className="btnSet">
                                            <button onClick={() => disableUpdate(idx)}>CANCEL</button>
                                            <button onClick={() => updatePost(idx)}>SAVE</button>
                                        </div>
                                    </>
                                )
                                // 출력모드 UI
                                : (
                                    <>
                                        <div className="txt">
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
                                        </div>
                                        <div className="btnSet">
                                            <button onClick={() => enableUpdate(idx)}>EDIT</button>
                                            <button onClick={() => deletePost(idx)}>DELETE</button>
                                        </div>
                                    </>
                                )
                            }

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