import Layout from "../common/Layout"
import { useState } from 'react'

function Join() {
    // 객체형태
    const initVal = {
        userid: '',
    };
    const [Val, setVal] = useState(initVal);
    const [Err, setErr] = useState({})

    // 3. 인수로 전달된 값으로 인증처리해서 에러 객체 값 반환함수
    const check = (val) => {
        const errs = {};
        // userid 체크 항목
        if (val.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요'
        }
        return errs;
    }

    const handleChange = (e) => {
        //console.log(e.target)
        const { name, value } = e.target;
        setVal({ ...Val, [name]: value });
    }

    // 인증처리
    const handleSubmit = (e) => {
        e.preventDefault(); // 기존의 submit 기능 막기

        // 2. check함수 호출해서 val값에 담겨 있는 값을 
        // check함수의 인수로 전달해서 err객체를 생성해서 반환
        // 반환된 에러객체는 다시 Err state에 옮겨닮음
        setErr(check(Val));
    }
    return (
        <Layout name={'Join'}>

            {/* 1. 전송버튼을 눌러서 handleSubmit 함수 호출 */}
            <form onSubmit={handleSubmit}>
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