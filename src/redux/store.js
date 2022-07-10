// 미들웨어 모듈 import (store에 저장 전 작업용)
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
//saga 미들웨어 모듈 import (사가랑 연결용)
import createSagaMiddleware from '@redux-saga/core';
//미들웨어 적용할 saga파일 import
import rootSaga from './saga';

//sagaMiddleware 함수 활성화
const sagaMiddleware = createSagaMiddleware();
//store생성시 applyMiddleware로 활성화된 sagaMiddle 적용
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//store에 적용된 sagaMiddleware를 통해서 rootSaga기능 활성화
sagaMiddleware.run(rootSaga);

// store공간을 생성한 다음 전달된 reducer를 store에 저장해서 내보냄
//const store = createStore(reducers);

export default store;
