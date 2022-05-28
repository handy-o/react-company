import Layout from "../common/Layout"
import { useEffect } from 'react'

function Community() {
    // useEffect(() => {
    //     console.log('mount');
    //     return () => { console.log('unMount') }
    // }, []);

    return (
        <Layout name={'Community'}>
            <h1>Community</h1>
        </Layout>
    )
}

export default Community