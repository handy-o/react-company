import { startTransition } from "react"

function Pics({ Scrolled, start, base }) {
    console.log(Scrolled)
    const position = Scrolled - start - base;
    return (
        <section id="pics" className="myScroll">
            {/* <p style={position >= 0 ? { left: 100 + position } : null}>FLICKER</p> */}
            <p style={{ left: 100 + position }}>FLICKER</p>
        </section>
    )
}

export default Pics