import Header from '../common/Header'
import News from './News'
import Pics from './Pics'
import Vids from './Vids'
import Visual from './Visual'
import Btns from './Btns'
import Anime from '../../asset/anim.js';

import { useRef, useState, useEffect } from 'react'


function Main() {
    const main = useRef(null);
    const pos = useRef([]);
    const [Index, setIndex] = useState(0);

    const getPos = () => {
        pos.current = [];
        const secs = main.current.querySelectorAll('.myScroll');

        for (const sec of secs) pos.current.push(sec.offsetTop);
        //window.scroll(0, pos.current[Index]);
        //console.log(pos.current);
    }

    const activation = () => {
        const scroll = window.scrollY;
        const btns = main.current.querySelectorAll('scroll_navi li');

        pos.current.map((pos, idx) => {
            if (scroll >= pos) {
                for (const btn of btns) btn.classList.remove('on');
                btns[idx].classList.add('on');
            }
        })
    }

    useEffect(() => {
        getPos();

        window.addEventListener('resize', getPos);
        window.addEventListener('scroll', activation);
        return () => {
            window.removeEventListener('resize', getPos);
            window.removeEventListener('scroll', activation);
        }
    }, []);

    useEffect(() => {
        new Anime(window, {
            prop: 'scroll',
            value: pos.current[Index],
            duration: 500,
        })
    }, [Index])

    return (
        <main ref={main}>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics />
            <Vids />
            <Btns setIndex={setIndex} />
        </main>
    )
}

export default Main