import Layout from "../common/Layout"
import { useState } from 'react'

function Join() {
    // 객체형태
    const initVal = {
        userid: '',
    };
    const [Val, setVal] = useState(initVal);

    const handleChange = (e) => {
        //console.log(e.target)
        const { name, value } = e.target;
        console.log(name)
        console.log(value)

        // Val을 복제해서 가져와 value에 넣기
        //객체에서 변수값을 key에 넣을 수 없음
        // 객체에서 변수값을 key값으로 활용하려면 객체안에서 변수명을 대괄호로 묶어준다.
        // 이것과 동일 - setVal({...Val, userid: 현재입력된 값});
        setVal({ ...Val, [name]: value });
    }
    return (
        <Layout name={'Join'}>

            <form action="">
                <fieldset>
                    <legend>회원가입 폼 양식</legend>
                    <table border="1">
                        <caption>회원가입 정보입력</caption>
                        <thead>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="userid">USER ID</label>
                                </th>
                                <td>
                                    <input type="text" id="userid" name="userid"
                                        placeholder="아이디를 입력하세요"
                                        // 입력한 값을 value로 
                                        value={Val.userid}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2">
                                    <input type="reset" value="CANCEL" />
                                    <input type="submit" value="SUBMIT" />
                                </th>
                            </tr>
                        </thead>

                    </table>
                </fieldset>
            </form>
        </Layout>
    )
}

export default Join