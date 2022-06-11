import Layout from "../common/Layout"
import { useState, useEffect } from 'react'

function Join() {
    // 객체형태
    const initVal = {
        userid: '',
        email: '',
        pwd1: '',
        pwd2: '',
        gender: null, // boolean값 받아야해서 true,false
    };
    const [Val, setVal] = useState(initVal);
    const [Err, setErr] = useState({})

    // 3. 인수로 전달된 값으로 인증처리해서 에러 객체 값 반환함수
    const check = (val) => {
        const errs = {};
        // 비밀번호 조건 문자열/숫자/특문
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[!@#$%^&*()_+]/;

        // userid 체크 항목
        if (val.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요';
            //alert(errs.userid);
        }
        // email 체크 항목 (8글자 이하거나 @가 없으면)
        if (val.email.length < 8 || !/@/.test(val.email)) {
            errs.email = '이메일은 최소 8글자 이상 @를 포함해주세요';
            //alert(errs.email);
        }

        // pwd1 체크 항목 (문자열5 , 문자-숫자-특수문자 포함)
        if (val.pwd1.length < 5 || !eng.test(Val.pwd1) || !num.test(Val.pwd1) || !spc.test(Val.pwd1)) {
            errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
            //alert(errs.pwd1);
        }
        // pwd2 체크항목
        if (val.pwd1 !== val.pwd2 || !val.pwd2) {
            errs.pwd2 = '비밀번호를 동일하게 입력해주세요';
            //alert(errs.pwd2);
        }
        // 성별체크
        if (!Val.gender) {
            errs.gender = '성별을 선택하세요';
        }
        return errs;
    }

    const handleChange = (e) => {
        //console.log(e.target)
        const { name, value } = e.target;
        setVal({ ...Val, [name]: value });
    }

    const handleRadio = e => {
        const { name } = e.target; // 비구조할당으로 e.target의 name값
        const isCheck = e.tartget.checked; // true, false
        setVal({ ...Val, [name]: isCheck })
    }

    // 인증처리
    const handleSubmit = (e) => {
        e.preventDefault(); // 기존의 submit 기능 막기

        // 2. check함수 호출해서 val값에 담겨 있는 값을 
        // check함수의 인수로 전달해서 err객체를 생성해서 반환
        // 반환된 에러객체는 다시 Err state에 옮겨닮음
        setErr(check(Val));
    }

    useEffect(() => {
        console.log(Err);
    }, [Err])
    return (
        <Layout name={'Join'}>

            {/* 1. 전송버튼을 눌러서 handleSubmit 함수 호출 */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>회원가입 폼 양식</legend>
                    <table border="1">
                        <caption>회원가입 정보입력</caption>
                        <thead>
                            {/* user id */}
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
                                    <span className="err">{Err.userid}</span>
                                </td>
                            </tr>
                            {/* password */}
                            <tr>
                                <th scope="row">
                                    <label htmlFor="pwd1">PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password"
                                        name="pwd1"
                                        id="pwd1"
                                        placeholder="비밀번호를 입력하세요"
                                        value={Val.pwd1}
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.pwd1}</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label htmlFor="pwd2">2 PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password"
                                        name="pwd2"
                                        id="pwd2"
                                        placeholder="비밀번호를 재입력하세요"
                                        value={Val.pwd2}
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.pwd2}</span>
                                </td>
                            </tr>

                            {/* email  */}
                            <tr>
                                <th scope="row">
                                    <label htmlFor="email">E-MAIL</label>
                                </th>
                                <td>
                                    <input type="text" id="email" name="email"
                                        placeholder="아이디를 입력하세요"
                                        // 입력한 값을 value로 
                                        value={Val.email}
                                        onChange={handleChange}
                                    />
                                    <span className="err">{Err.email}</span>
                                </td>
                            </tr>

                            {/* gedner */}
                            <tr>
                                <th scope="row">
                                    GENDER
                                </th>
                                <td>
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" id="male" name="gender" onChange={handleRadio} />
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" id="female" name="gender" onChange={handleRadio} />
                                    <span className="err">{Err.gender}</span>
                                </td>
                            </tr>


                            {/* btns  */}
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