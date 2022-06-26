import { forwardRef, useImperativeHandle, useState } from 'react'

// 1단계 - 기존 컴포넌트 함수를 대입형(화살표)함수로 변경
// 2단계 - 해당(화살표) 컴포넌트 함수를 forwradRef()의 콜백으로 전달
// 3단계 - 콜백으로 전달한 함수의 두번째 파라미터로 ref를 추가


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