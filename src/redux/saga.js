import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchMember, fetchYoutube } from './api';
import * as types from './actionType';

/*
    takeLatest : 액션 요청이 여러번 들엉면 제일 최근요청 하나만 실행 (takeEvery: 들어오는 요청 모두처리)
    all : 여러개의 요청함수를 병렬식으로 동시에 처리
    call : * 특정함수를 동기적으로 호출(api 요청시 주로 사용, 두번째 인수값을 api요청에 필요한 옵션값 전달가능)
    fork : saga실행 함수
    put : (=dispatch) reducer로 action객체 전달

    디스패치 - 컴포넌트에서 전달하려고 할 때
    풋- 사가에서 전달하려고 할 때 
*/

//요청받은 액션타입에 따라 함수 호출
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

//컴포넌트에서 받은 인수값을 api.js에 있는 axiox함수에 연결하는 함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.error, payload: err });
	}
}

// member saga
export function* callMember() {
	yield takeLatest(types.MEMBER.start, returnMember);
}
export function* returnMember() {
	try {
		const response = yield call(fetchMember);
		yield put({ type: types.MEMBER.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBER.error, payload: err });
	}
}

// youtube saga
export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.error, payload: err });
	}
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callMember), fork(callYoutube)]);
}
