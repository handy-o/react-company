//common
import Header from './component/common/Header';
import Footer from './component/common/Footer';

//main
import Main from './component/main/Main';

//sub
import Department from './component/sub/Department';
import Community from './component/sub/Community';
import Gallery from './component/sub/Gallery';
import Youtube from './component/sub/Youtube';
import Location from './component/sub/Location';
import Join from './component/sub/Join';

import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setYoutube, setMembers } from './redux/action';

//scss
import './scss/style.scss';

function App() {
	const dispatch = useDispatch();
	const fetchYoutube = async () => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			dispatch(setYoutube(json.data.items));
			// {type: 'SET_YOUTUBE', payload: json.data.items}
		});
	};

	const path = process.env.PUBLIC_URL;
	const fetchMember = async () => {
		await axios.get(`${path}/DB/member.json`).then((json) => {
			dispatch(setMembers(json.data.members));
		});
	};
	useEffect(() => {
		// 여러 함수 호출하려고 랩핑함수
		fetchYoutube();
		fetchMember();
		// 처음App 컴포넌트 구동 시 개인계정의 데이터옵션을 saga로 액션객체에 담아보냄
		// saga-> reducer -> store -> index를 거쳐 어떤 컴포넌트에서든 useSelector Flickr데이터 접근가능
		dispatch({
			type: 'FLICKR_START',
			Opt: { type: 'user', count: 50, user: '195938691@N04' },
		});
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />{' '}
				{/* exact 쓰지 않으면 다른 경로에서 모두 '/' 를 포함하기 때문에 아래 컴포넌트들이 모두 화면에 표시됨 */}
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			{/* 
			3줄을 한줄로 변경 -> 컴포넌트 속성 추가
			<Route path='/community'>
				<Community />
			</Route> */}
			<Route path='/community' component={Community} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/join' component={Join} />
			<Route path='/location' component={Location} />
			<Route path='/youtube' component={Youtube} />

			<Footer />
		</>
	);
}

export default App;
