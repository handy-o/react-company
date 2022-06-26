import { forwardRef, useImperativeHandle, useState } from 'react'

// 1단계 - 기존 컴포넌트 함수를 대입형(화살표)함수로 변경
// 2단계 - 해당(화살표) 컴포넌트 함수를 forwradRef()의 콜백으로 전달
// 3단계 - 콜백으로 전달한 함수의 두번째 파라미터로 ref를 추가

/*
    기본적으로 react는 단방향 데이터 바인딩 (부모->자식)
    자식에서 부모로 데이터를 전달하려면 부모에서 자식 컴포넌트를 useRef로 참조
    자식에서 리턴되는 값이 있어야 부모에서 자식 컴포넌트를 참조가능
    이때 필요한 것이? forwardRef
    fowardRef()는 자식 JSX요소를 ref에 담아서 부모요소로 리턴가능
    만약 내보낼 값이 JSX가 아닌 특정 커스텀 객체일 때는 useImperativeHandle을 사용해야 함
    사용방법은 위 단계를 거침
*/

const Popup = forwardRef((props, ref) => {
    const [Open, setOpen] = useState(false); // 초기값은 안보여야하니 false
    useImperativeHandle(ref, () => {
        return { // 객체를 return할 때에는 {}
            open: () => setOpen(true),
        }
    })

    return (
        <>
            {Open && ( // Open state가 true일 때 
                <aside className="pop">
                    <div className="con">
                        {props.children}
                        <span className="close"
                            onClick={() => setOpen(false)}>Close</span>
                    </div>
                </aside>
            )}
        </>
    )
})

export default Popup