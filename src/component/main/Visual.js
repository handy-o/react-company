import Anime from '../../asset/anim.js';
import { useRef } from 'react';

function Visual() {
    const panel = useRef(null);
    let panel_li = null;
    let len = null;



    const showNext = () => {
        panel_li = panel.current.children;
        len = panel_li.length;
        const currentEl = panel.current.querySelector('.on');
        const current_inedex = Array.from(panel_li).indexOf(currentEl); // .from유사배열을? 순서배열로?
        console.log(current_index); // 클릭했을 때 순번 idx
        //현재 순번, 다음순번 
        let next_index = null;
        current_index !== len - 1 // 마지막 순번이 아니면 
            ? next_index = current_index + 1 // 현재에 + 1
            : next_index = 0;	// 끝이니까 다음은 처음으로 0

        showSlide(currentEl, next_index);
    }


    // 만약에 dir값이 플러스면  >>
    // 만약에 dir값이 마이너스면 << 
    const showSlide = (el, index, direction) => {
        panel_li = panel.current.children;

        // 기존 환성화 패널 왼쪽 밖으로 모션 이동
        new Anime(el, {
            prop: 'left',
            value: -direction * 100 + '%',
            duration: 500,
            callback: () => {
                el.classList.remove('on');
                el.style.display = 'none';
            }
        });

        panel_li[index].style.display = 'flex';
        panel_li[index].style.left = direction * 100 + '%';


        // 앞으로 활성화 될 패널 프레임 안쪽으로 모션 이동
        new Anime(panel_li[index], {
            prop: 'left',
            value: '0%',
            duration: 500,
            callback: () => {
                el.classList.remove('on');
                el.style.display = 'none';
            }
        });

        panel_li[index].style.display = 'flex';
        panel_li[index].style.left = direction * 100 + '%';
    }

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

                <ul className='navi'>
                    <li className='on'></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                <button className='prev' onClick={showPrev}></button>
                <button className='next' onClick={showNext}></button>
            </article>
        </figure>
    );
}

export default Visual;