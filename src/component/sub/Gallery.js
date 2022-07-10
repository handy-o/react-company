import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import Popup from '../common/Popup';

function Gallery() {
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const dispatch = useDispatch();
	const frame = useRef(null);
	const pop = useRef(null);
	const input = useRef(null);
	const [EnableClick, setEnableClick] = useState(false);
	const [Loading, setLoading] = useState(true);
	const [Index, setIndex] = useState(0);
	const [Opt, setOpt] = useState({
		type: 'user',
		count: 50,
		user: '195938691@N04',
	});
	const masonryOption = { transitionDuration: '0.5s' };

	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	};
	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	// 전역스토어로부터 flickr 데이터가 받아져서 Items값이 변경되면, endLoading함수 호출해서 로딩바 숨기고 화면에 데이터 출력
	useEffect(endLoading, [Items]);

	const showInterest = () => {
		if (!EnableClick) return; //아직 로딩중이니깐 끝내
		setLoading(true);
		frame.current.classList.remove('on'); // 다시 프레임이 안보이고 로딩바가 보이게
		setOpt({ type: 'interest', count: 50 });
	};

	const showUser = (e) => {
		if (!EnableClick) return;
		let user = e.target.innerText;
		if (user === 'Show Mine') user = '195938691@N04';
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'user', count: 50, user: user });
	};

	const showSearch = (e) => {
		if (!EnableClick) return;
		const tag = input.current.value.trim();
		input.current.value = '';
		if (!tag) return alert('검색어를 입력하세요');
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({
			type: 'search',
			count: 50,
			tags: tag,
		});
	};

	return (
		<>
			<Layout name={'Gallery'}>
				<button onClick={showInterest}>Show Interest</button>
				<button onClick={showUser}>Show Mine</button>

				<div className='searchBox'>
					<input
						type='text'
						ref={input}
						placeholder='검색어를 입력하세요'
						onKeyUp={(e) => {
							if (e.key === 'Enter') showSearch();
						}}
					/>
					<button onClick={showSearch}>SEARCH</button>
				</div>

				{Loading && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
					/>
				)}
				<article ref={frame}>
					<Masonry elementType={'ul'} options={masonryOption}>
						{Items.map((item, idx) => {
							return (
								<li key={item.id}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) =>
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													)
												}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</li>
							);
						})}
					</Masonry>
				</article>
			</Layout>

			<Popup ref={pop}>
				{Items.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`}
						alt={Items[Index].title}
					/>
				)}
			</Popup>
		</>
	);
}

export default Gallery;
