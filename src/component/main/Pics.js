import { startTransition } from "react"

function Pics({ Scrolled, start, base }) {
    let position = 0;
    if (start) position = Scrolled - start - base;

    //console.log(Scrolled)

    return (
        <section id="pics" className="myScroll">
            {/* <p style={position >= 0 ? { left: 100 + position } : null}>FLICKER</p> */}
            <p style={{ left: 100 + position }}>FLICKER</p>

            <h3 style={{ left: 100 + position * 2 }}>FLICKR</h3>
        </section>
    )
}

export default Pics