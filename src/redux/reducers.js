// Reducer : 전역데이터인 store에 초기 데이터를 전달해주거나 기존 데이터를 ㅕㄴ경 (변경자)
import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'CEO',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'Back-End Developer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-End Developer',
			pic: 'member4.jpg',
		},
		{
			name: 'Peter',
			position: 'UI Designer',
			pic: 'member5.jpg',
		},
	],
};

//  초기 데이터를 state에 저장했다가
//  추후 action 객체가 전달되면
//  action 객체의 타입에 따라 기존 데이터를 변경해서 리턴
/*
const memberReducer = (state = initMember, action) => {
    switch (action.type) {
        case 'SET_MEMBERS':
            return { ...state, members: action.payload }

        default:
            return state;
    }
}
*/

// 기존 reducer에 상수값으로 member데이터를 연결하는게 아닌,
// Youtube처럼 public 폴더 안쪽에 member.json 데이터를
// 비동기 서버통신해서 상태관리
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const flickerReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START': // 복사
			return { ...state };

		case 'FLICER_SUCCESS': // type이 하나 더 추가됨
			return { ...state, flickr: action.payload };

		case 'FLICKR_ERROR':
			return { ...state, error: action.payload }; //state에 error라는 키값을 담아

		default:
			return state;
	}
};

const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickerReducer,
});

// 내보내기
export default reducers;
