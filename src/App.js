//common
import Header from './component/common/Header';
import Footer from './component/common/Footer';

//main
import Visual from './component/main/Visual';
import Content from './component/main/Content';

//sub
import Department from './component/sub/Department';
import Community from './component/sub/Community';
import Gallery from './component/sub/Gallery';
import Youtube from './component/sub/Youtube';
import Location from './component/sub/Location';
import Join from './component/sub/Join';


import { Route, Switch } from 'react-router-dom'


//scss
import './scss/style.scss'

function App() {
	return (
		<>
			<Switch>
				<Route exact path="/">	{/* exact 쓰지 않으면 다른 경로에서 모두 '/' 를 포함하기 때문에 아래 컴포넌트들이 모두 화면에 표시됨 */}
					<Header type={'main'} />
					<Visual />
					<Content />
				</Route>

				<Route path="/" render={() => <Header type={'sub'} />} />
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
