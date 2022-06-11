import Layout from "../common/Layout"
import { useState, useEffect } from 'react'
import { useHiistory } from 'react-router-dom'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Join() {
    // 객체형태
    const initVal = {
        userid: '',
        email: '',
        pwd1: '',
        pwd2: '',
        gender: null, // boolean값 받아야해서 true,false
        interest: null,
        edu: '',
        comments: '',
    };
    const [Val, setVal] = useState(initVal);
    const [Err, setErr] = useState({});
    const [Success, setSuccess] = useState(false); // 최종전송
    const [Submit, setSubmit] = useState(false); // submit버튼을 눌렀을 떄 체크
    const history = useHistory();


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
        //취미 체크
        if (!Val.interest) {
            errs.interest = '관심사를 하나이상 선택하세요';
        }
        // 학력 체크
        if (Val.edu == '') { // 빈문자열이면
            errs.edu = '최종학력을 선택하세요';
        }
        // 코멘트 체크
        if (Val.comments.length < 20) {
            errs.comments = '남기는 말은 20글자 이상 입력하세요';
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

    const handleCheck = e => {
        let isCheck = false; // 다중 체크가 되기 때문에 값을 바꿔야해서 재할당이 일어나서 let
        const { name } = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input'); // 체크박스 모두 선택

        inputs.forEach(el => {
            if (el.checked) isCheck = true; // 하나라도 체크하면 체크
        })
        setVal({ ...Val, [name]: isCheck });
    }

    const handleSelect = e => {
        const { name, value } = e.target;
        //const isSelected = e.target.options[e.target.selectedIndex].value; 
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

    const handleReset = () => {
        setSubmit(false);
        setErr({});
        setVal(initVal);
    }

    useEffect(() => {
        //console.log(Err);
        //console.log(Object.keys(Err).length);
        const len = Object.keys(Err).length;

        //len === 0 ? setSuccess(true) : setSuccess(false);
        if (len === 0 && Submit) {
            setSuccess(true); //('인증통과')
            history.push('/');
            window.scroll(0, 0)
        } else {
            setSuccess(false); //('인증실패')
        }
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

                            {/* interests   */}
                            <tr>
                                <th scope="row">INTEREST</th>
                                <td>
                                    <label htmlFor="sports">Sports</label>
                                    <input type="checkbox" id="sports" name="interest"
                                        onChange={handleCheck} />

                                    <label htmlFor="game">game</label>
                                    <input type="checkbox" id="game" name="interest"
                                        onChange={handleCheck} />

                                    <label htmlFor="music">music</label>
                                    <input type="checkbox" id="music" name="interest"
                                        onChange={handleCheck} />
                                    <span className="err">{Err.interest}</span>
                                </td>
                            </tr>

                            {/* edu  */}
                            <tr>
                                <th scope="row">
                                    <label htmlFor="edu">Education</label>
                                </th>
                                <td>
                                    <select name="edu" id="edu" onChange={handleSelect}>
                                        <option value="">학력을 선택하세요</option>
                                        <option value="elementary-school">초등학교 졸업</option>
                                        <option value="midde-school">중학교 졸업</option>
                                        <option value="high-school">고등학교 졸업</option>
                                        <option value="college">대학교 졸업</option>
                                    </select>
                                    <span className="err">{Err.edu}</span>
                                </td>
                            </tr>

                            {/* comments */}
                            <tr>
                                <th scope="row">
                                    <label htmlFor="comments">COMMENTS</label>
                                </th>
                                <td>
                                    <textarea name="comments" id="comments"
                                        cols="30" rows="5"
                                        placeholder="남기는 말을 입력하세요."
                                        onChange={handleChange}>

                                    </textarea>
                                    <span className="err">{Err.comments}</span>
                                </td>
                            </tr>

                            {/* btns  */}
                            <tr>
                                <th colSpan="2">
                                    <input type="reset" value="CANCEL"
                                        //onClick={() => setVal(initVal)} 
                                        onClick={handleReset}
                                    />
                                    <input type="submit" value="SUBMIT"
                                        conClick={() => setSubmit(true)} />
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