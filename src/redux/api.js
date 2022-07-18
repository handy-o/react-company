import axios from 'axios';

//getFlickr => fetchFlickr
export const fetchFlickr = async (opt) => {
	const key = '418715e184dbd270f5ea19ff1fa3672f';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';
	if (opt.type === 'interest')
		url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&format=json&nojsoncallback=1`;
	if (opt.type === 'search')
		url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&tags=${opt.tags}&format=json&nojsoncallback=1`;
	if (opt.type === 'user')
		url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${key}&per_page=${opt.count}&user_id=${opt.user}&format=json&nojsoncallback=1`;

	return await axios.get(url);
};

/*
    redux로 관리하는 파일들은
    컴포넌트 외부에서 컴포넌트 위존성 없이 전역으로 동작하기 때문에 
    부수효과가 발생되지 않는 순수함수 형태로 제작

    부수효과(SideEffect) : Dom요소 같이 컴포넌트가 제어해야 되는 화면의 변경점을 야기시키는 효과

    순수함수(PureFunction) : 부수효과를 발생시키지 않는 함수


*/

export const fetchMember = async () => {
	const url = `${process.env.PUBLIC_URL}/DB/member.json`;
	return await axios.get(url);
};

export const fetchYoutube = async () => {
	const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
	const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
	const num = 8;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

	return await axios.get(url);
};
