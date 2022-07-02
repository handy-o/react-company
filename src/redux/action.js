// 액션생성함수 : 인수로 전달될 값을 특정 타입으로 지정해서 action 객체에 담아 리턴
/* 
    변경할 데이터를 setMember함수에 인수로 전달해 호출하면
   setMembers(변경할 멤버데이터)
   다음과 같은 액션 객체를 반환 
   { 
        type:'SET_MEMBERS',
        payload: 변경될 데이터
    }
*/
export const setMembers = (member) => {
    return {
        type: 'SET_MEMBERS',
        payload: member, // member라는 파라미터로 저장
    }
}