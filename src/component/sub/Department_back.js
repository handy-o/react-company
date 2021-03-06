import Layout from "../common/Layout"
import axios from 'axios';
import { useState, useEffect } from 'react'; // 외부API
const path = process.env.PUBLIC_URL;

function Department() {
    const [members, setMembers] = useState([]);



    useEffect(() => {
        axios.get(`${path}/DB/member.json`).then(json => {
            //console.log(json.data.members)
            setMembers(json.data.members)
        })
    }, [])

    return (
        <Layout name={'Department'}>
            {/* <h1>Department</h1> */}

            <div className="wrap">
                {members.map((member, idx) => {
                    return (
                        <article key={idx}>
                            <div className="inner">
                                <div className="pic">
                                    <img src={`${path}/img/${member.pic}`} alt={member.name} />
                                </div>
                                <h2>{member.name}</h2>
                                <p>{member.position}</p>
                            </div>
                        </article>
                    )
                })}
            </div>

        </Layout>
    )
}

export default Department