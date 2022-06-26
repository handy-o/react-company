import { forwardRef, useImperativeHandle, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// motion - 모션처리 객체 설정
// animatepresence - 컴포넌트가 끝날 떄 (unmount) 모션이 되도록 지연시켜줌

const Popup = forwardRef((props, ref) => {
    const [Open, setOpen] = useState(false); // 초기값은 안보여야하니 false
    useImperativeHandle(ref, () => {
        return { // 객체를 return할 때에는 {}
            open: () => setOpen(true),
        }
    })

    return (
        <AnimatePresence>
            {Open && ( // Open state가 true일 때 
                <motion.aside className="pop"
                    initial={{ opacity: 0, scale: 0 }} //초기 
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }} // 모션될 때 
                    exit={{ opacity: 0, scale: 1, transition: { duration: 0.5, delay: 1 } }}    // 사라질 때 
                >
                    <motion.div className="con"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
                        exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
                    >
                        {props.children}
                        <motion.span className="close"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 1 } }}
                            exit={{ opacity: 0, x: 50 }}
                            onClick={() => setOpen(false)}>Close
                        </motion.span>
                    </motion.div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
})

export default Popup