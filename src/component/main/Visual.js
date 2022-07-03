import Anime from '../../asset/anim.js';
import { useRef, useState } from 'react';

function Visual() {
    //console.log('visual');
    const panel = useRef(null);
    const navi = useRef(null);
    const Index = useRef(0);
    const EnableClick = useRef(true);

    //const [Index, setIndex] = useState(0);
    //const [EnableClick, setEnableClick] = useState(true);


    // 현재활성화된 패널과 순서값, 전체패널갯수를 리턴
    const init = () => {
        const panel_li = panel.current.children;
        const len = panel_li.length;
        const currentEl = panel.current.querySelector('.on');
        const current_index = Array.from(panel_li).indexOf(currentEl);
        return [currentEl, current_index, len];
    };

    // 앞으로 활성화될 이전 패널 순번을 구하는 함수
    const showPrev = () => {
        const [currentEl, current_index, len] = init();

        let prev_index = null;
        current_index !== 0
            ? (prev_index = current_index - 1)
            : (prev_index = len - 1);

        if (EnableClick.current) showSlide(currentEl, prev_index, -1);
    };

    // 앞으로 활성화될 다음 패널 순번을 구하는 함수
    const showNext = () => {
        const [currentEl, current_index, len] = init();
        let next_index = null;
        current_index !== len - 1
            ? (next_index = current_index + 1)
            : (next_index = 0);

        if (EnableClick.current) showSlide(currentEl, next_index, 1);
    };

    // 클릭한 네비버튼의 순번을 통해서 이전,다음 패널을 보여줄지 결정하는 함수
    const showNavi = (index) => {
        const [currentEl, current_index] = init();
        const target_index = index;

        if (!EnableClick.current) return;
        if (target_index > current_index) showSlide(currentEl, target_index, 1);
        if (target_index < current_index) showSlide(currentEl, target_index, -1);
    };

    // 실제로 인수로 받은 순번을 활성화시키면서 모션을 발생시키는 함수
    const showSlide = (el, index, direction) => {
        EnableClick.current = false;
        const panel_li = panel.current.children;

        //기존 활성화 패널  왼쪽 밖으로 모션 이동
        new Anime(el, {
            prop: 'left',
            value: -direction * 100 + '%',
            duration: 500,
            callback: () => {
                el.classList.remove('on');
                el.style.display = 'none';
            },
        });

        panel_li[index].style.display = 'flex';
        panel_li[index].style.left = direction * 100 + '%';

        //앞으로 활성화될 패널 프레임 안쪽으로 모션 이동
        new Anime(panel_li[index], {
            prop: 'left',
            value: '0%',
            duration: 500,
            callback: () => {
                panel_li[index].classList.add('on');
                EnableClick.current = true;
            },
        });

        Index.current = index;
        activation(index);
    };

    // 현재 활성화되는 순서값에 따라서 버튼 활성화 함수
    const activation = (index) => {
        for (const el of navi.current.children) el.classList.remove('on');
        navi.current.children[index].classList.add('on');
    };

    return (
        <figure id='visual' className='myScroll'>
            <article id='slider'>
                <ul className='panel' ref={panel}>
                    <li className='s1 on'>
                        <span>1</span>
                    </li>
                    <li className='s2'>
                        <span>2</span>
                    </li>
                    <li className='s3'>
                        <span>3</span>
                    </li>
                    <li className='s4'>
                        <span>4</span>
                    </li>
                    <li className='s5'>
                        <span>5</span>
                    </li>
                </ul>

                <ul className='navi' ref={navi}>
                    {[0, 1, 2, 3, 4].map((num) => {
                        let on = '';
                        Index.current === num ? (on = 'on') : (on = '');
                        return (
                            <li key={num} className={on} onClick={() => showNavi(num)}></li>
                        );
                    })}
                </ul>

                <button className='prev' onClick={showPrev}></button>
                <button className='next' onClick={showNext}></button>
            </article>
        </figure>
    );
}

export default Visual;